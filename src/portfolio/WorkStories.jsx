import React, { useEffect, useId, useRef, useState } from "react";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

function storyFromUrl(stories) {
  const requested = new URLSearchParams(window.location.search).get("story");
  return stories.some((story) => story.id === requested) ? requested : stories[0]?.id;
}

function updateStoryInUrl(storyId, replace = false) {
  const url = new URL(window.location.href);
  url.searchParams.set("view", "work");
  url.searchParams.set("story", storyId);
  url.hash = "psb-work";
  window.history[replace ? "replaceState" : "pushState"]({ ...(window.history.state || {}), story: storyId, view: "work" }, "", url);
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener?.(update);
    return () => media.removeListener?.(update);
  }, []);

  return reducedMotion;
}

function StoryMedia({ media, reducedMotion }) {
  if (!media?.length) return null;

  return (
    <div className={`psb-story-media ${media.length > 1 ? "is-paired" : ""}`}>
      {media.map((item) => (
        <figure key={item.src}>
          {item.type === "video" ? (
            <video
              aria-label={item.alt}
              autoPlay={!reducedMotion}
              controls
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          ) : (
            <img alt={item.alt} loading="lazy" src={item.src} />
          )}
          <figcaption>
            <span>{item.caption}</span>
            {item.url ? <a href={item.url} {...externalProps}>{item.link_label || "Read the paper"} <i aria-hidden="true">↗</i></a> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function StorySignal({ story }) {
  const diagrams = {
    "mclaren-gtc": {
      label: "AI Physics workflow from simulation data to engineering decisions",
      kicker: "AI Physics workflow",
      stages: [
        { label: "Simulation data", detail: "CFD · FEA" },
        { label: "AI Physics", detail: "Surrogates · agents" },
        { label: "Engineering loop", detail: "Validate · iterate" },
      ],
    },
    "gm-virtual-engineering": {
      label: "Virtual engineering loop from concept design through aerodynamic simulation and design feedback",
      kicker: "Virtual engineering loop",
      stages: [
        { label: "Concept design", detail: "AI-assisted" },
        { label: "Virtual wind tunnel", detail: "Aerodynamics" },
        { label: "Design feedback", detail: "Simulate · refine" },
      ],
    },
  };
  const diagram = diagrams[story.id] || {
    label: `${story.title}: ${story.tags.join(", ")}`,
    kicker: story.category,
    stages: story.tags.slice(0, 3).map((tag) => ({ label: tag, detail: "" })),
  };

  return (
    <div aria-label={diagram.label} className="psb-story-signal" data-story={story.id} role="img">
      <header><span>{diagram.kicker}</span><i aria-hidden="true" /></header>
      <div className="psb-story-signal__flow">
        {diagram.stages.map((stage, index) => (
          <div className={index === 1 ? "is-core" : undefined} key={stage.label}>
            <strong>{stage.label}</strong>
            {stage.detail ? <em>{stage.detail}</em> : null}
          </div>
        ))}
      </div>
      <footer aria-hidden="true">{story.tags.map((tag) => <i key={tag}>{tag}</i>)}</footer>
    </div>
  );
}

export function WorkStories({ stories = [] }) {
  const panelId = `psb-story-panel-${useId().replace(/:/g, "")}`;
  const tabRefs = useRef([]);
  const reducedMotion = useReducedMotion();
  const [activeStoryId, setActiveStoryId] = useState(() => storyFromUrl(stories));
  const activeStory = stories.find((story) => story.id === activeStoryId) || stories[0];

  useEffect(() => {
    const handlePopState = () => setActiveStoryId(storyFromUrl(stories));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [stories]);

  if (!activeStory) return null;

  const chooseStory = (storyId) => {
    if (storyId === activeStoryId) return;
    setActiveStoryId(storyId);
    updateStoryInUrl(storyId);
  };

  const moveToStory = (event, index) => {
    const keyTargets = {
      ArrowLeft: (index - 1 + stories.length) % stories.length,
      ArrowRight: (index + 1) % stories.length,
      Home: 0,
      End: stories.length - 1,
    };
    const nextIndex = keyTargets[event.key];
    if (nextIndex === undefined || nextIndex === index) return;

    event.preventDefault();
    const nextStory = stories[nextIndex];
    setActiveStoryId(nextStory.id);
    updateStoryInUrl(nextStory.id, true);
    tabRefs.current[nextIndex]?.focus();
    tabRefs.current[nextIndex]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "nearest" });
  };

  return (
    <div className="psb-story-browser">
      <nav className="psb-story-index" aria-label="Selected work stories">
        <header><span>Story index</span><strong>{stories.length} stories</strong></header>
        <div className="psb-story-tabs" role="tablist" aria-label="Choose a story" aria-orientation="horizontal">
          {stories.map((story, index) => {
            const isActive = activeStory.id === story.id;
            const tabId = `${panelId}-tab-${story.id}`;
            return (
              <button
                aria-controls={panelId}
                aria-selected={isActive}
                className="psb-glow-surface"
                id={tabId}
                key={story.id}
                onClick={() => chooseStory(story.id)}
                onKeyDown={(event) => moveToStory(event, index)}
                ref={(element) => { tabRefs.current[index] = element; }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <span>{story.number}</span>
                <small>{story.category}</small>
                <strong>{story.nav_title || story.title}</strong>
                <i className="psb-sr-only">{isActive ? "Currently selected" : "Open story"}</i>
              </button>
            );
          })}
        </div>
      </nav>

      <article aria-labelledby={`${panelId}-tab-${activeStory.id}`} className="psb-story-reader" id={panelId} key={activeStory.id} role="tabpanel">
        <header>
          <div><span>{activeStory.relationship}</span><time>{activeStory.year}</time></div>
          <p>{activeStory.category}</p>
          <h3 id={`${panelId}-title`}>{activeStory.title}</h3>
          <strong>{activeStory.summary}</strong>
        </header>

        {activeStory.media?.length ? (
          <StoryMedia media={activeStory.media} reducedMotion={reducedMotion} />
        ) : (
          <StorySignal story={activeStory} />
        )}

        <div className="psb-story-body">
          {activeStory.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul aria-label="Methods and themes">
            {activeStory.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>

        <section className="psb-story-evidence" aria-labelledby={`${panelId}-evidence`}>
          <header><span>Evidence and sources</span><h4 id={`${panelId}-evidence`}>{activeStory.links.length} public links</h4></header>
          <ul>
            {activeStory.links.map((link) => (
              <li className={link.primary ? "is-primary" : undefined} key={link.url}>
                <a className="psb-glow-surface" href={link.url} {...externalProps}>
                  <span><small>{link.source}</small><strong>{link.label}</strong><em>{link.description}</em></span>
                  <i aria-hidden="true">↗</i>
                  <span className="psb-sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}

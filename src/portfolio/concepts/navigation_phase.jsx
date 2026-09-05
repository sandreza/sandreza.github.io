import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { CitationDialog } from "../CitationDialog.jsx";
import { WorkStories } from "../WorkStories.jsx";
import { LorenzAttractor } from "../LorenzAttractor.jsx";
import { derivatives, rk4Step, periodicTrajectory, periodicOrbits } from "../dynamics.js";

const ROUTES = [
  { id: "overview", label: "Overview", cue: "Start in phase space" },
  { id: "work", label: "Selected Work", cue: "Research + industry stories" },
  { id: "papers", label: "Academic Research", cue: "Articles + preprints" },
  { id: "background", label: "Background", cue: "Experience + contact" },
];

const ROUTE_IDS = new Set(ROUTES.map(({ id }) => id));
const ROUTE_ALIASES = { build: "work", rescale: "work" };
const externalProps = { target: "_blank", rel: "noopener noreferrer" };

function positionPointerGlow(event) {
  if (event.pointerType === "touch" || !(event.target instanceof Element)) return;
  const surface = event.target.closest(".psb-glow-surface");
  if (!surface || !event.currentTarget.contains(surface)) return;
  const bounds = surface.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  surface.style.setProperty("--psb-glow-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
  surface.style.setProperty("--psb-glow-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
}

const ATTRACTOR_BOX = { x: 0, y: 9, width: 350, height: 142 };

const ATTRACTOR_SYSTEMS = {
  rossler: {
    title: "Rössler chaotic attractor",
    description: "A numerically integrated Rössler trajectory with a numerically solved periodic orbit highlighted.",
    initial: [0.1, 0, 0],
    dt: 0.01,
    discard: 5000,
    retain: 24000,
    stride: 6,
    box: ATTRACTOR_BOX,
    derivative: derivatives.rossler,
    project: ([x, y]) => [x, y],
  },
  thomas: {
    title: "Thomas cyclically symmetric attractor",
    description: "A numerically integrated Thomas trajectory with a numerically solved periodic orbit highlighted.",
    initial: [1.1, 1.1, -0.01],
    dt: 0.02,
    discard: 20000,
    retain: 60000,
    stride: 12,
    box: ATTRACTOR_BOX,
    derivative: derivatives.thomas,
    project: ([x, y, z]) => {
      const yaw = 35 * Math.PI / 180;
      const pitch = 22 * Math.PI / 180;
      const projectedX = Math.cos(yaw) * x - Math.sin(yaw) * y;
      const depth = Math.sin(yaw) * x + Math.cos(yaw) * y;
      return [projectedX, Math.cos(pitch) * z - Math.sin(pitch) * depth];
    },
  },
  chen: {
    title: "Chen chaotic attractor",
    description: "A numerically integrated Chen trajectory with a numerically solved periodic orbit highlighted; a = 35, b = 3, c = 28.",
    initial: [-10, 0, 37],
    dt: 0.002,
    discard: 8000,
    retain: 16000,
    stride: 6,
    box: ATTRACTOR_BOX,
    derivative: derivatives.chen,
    project: ([x, y, z]) => [0.85 * x - 0.3 * y, z + 0.15 * y],
  },
};

function integrateAttractor(spec) {
  const points = [];
  let point = spec.initial;
  const total = spec.discard + spec.retain;

  for (let index = 0; index < total; index += 1) {
    point = rk4Step(point, spec.dt, spec.derivative);
    if (index >= spec.discard && (index - spec.discard) % spec.stride === 0) points.push(point);
  }

  return points;
}

function fitAttractor(points, spec, bounds) {
  const projected = points.map(spec.project);
  const source = bounds || projected;
  const xs = source.map(([x]) => x);
  const ys = source.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(
    spec.box.width / (maxX - minX || 1),
    spec.box.height / (maxY - minY || 1),
  );
  const offsetX = spec.box.x + (spec.box.width - (maxX - minX) * scale) / 2;
  const offsetY = spec.box.y + (spec.box.height - (maxY - minY) * scale) / 2;

  return projected.map(([x, y], index) => {
    const fittedX = offsetX + (x - minX) * scale;
    const fittedY = offsetY + (maxY - y) * scale;
    return `${index === 0 ? "M" : "L"}${fittedX.toFixed(2)},${fittedY.toFixed(2)}`;
  }).join(" ");
}

function AttractorDivider({ system }) {
  const spec = ATTRACTOR_SYSTEMS[system];
  const titleId = `psb-${system}-${useId().replace(/:/g, "")}`;
  const geometry = useMemo(() => {
    const points = integrateAttractor(spec);
    const orbit = periodicTrajectory(system);
    const bounds = [...points, ...orbit].map(spec.project);
    return {
      path: fitAttractor(points, spec, bounds),
      orbit: fitAttractor(orbit, spec, bounds),
    };
  }, [spec, system]);

  return (
    <figure className="psb-attractor-divider" data-system={system} title={`${spec.title} · periodic orbit T ≈ ${periodicOrbits[system].period.toFixed(6)}`}>
      <svg aria-labelledby={`${titleId}-title ${titleId}-description`} role="img" viewBox="0 0 1200 160" preserveAspectRatio="xMinYMid meet">
        <title id={`${titleId}-title`}>{spec.title}</title>
        <desc id={`${titleId}-description`}>{spec.description} Period {periodicOrbits[system].period.toFixed(6)} in model time units.</desc>
        <line className="psb-attractor-divider__baseline" x1="0" x2="1200" y1="159" y2="159" />
        <path className="psb-attractor-divider__trace" d={geometry.path} />
        <path className="psb-attractor-divider__orbit" d={geometry.orbit} />
      </svg>
    </figure>
  );
}

function requestedRoute() {
  const requested = new URLSearchParams(window.location.search).get("view");
  const route = ROUTE_ALIASES[requested] || requested;
  return ROUTE_IDS.has(route) ? route : "overview";
}

function updateRouteInUrl(route, mode = "replace") {
  const url = new URL(window.location.href);
  const removedStory = route !== "work" && url.searchParams.has("story");
  if (removedStory) url.searchParams.delete("story");
  if (route === "overview") {
    url.searchParams.delete("view");
    url.hash = "";
  } else {
    url.searchParams.set("view", route);
    url.hash = `psb-${route}`;
  }
  if (url.href === window.location.href && mode === "replace" && !removedStory) return;
  const state = { ...(window.history.state || {}), view: route };
  window.history[`${mode}State`](state, "", url);
}

function jumpToSection(scroller, section) {
  const previousBehavior = scroller.style.scrollBehavior;
  scroller.style.scrollBehavior = "auto";
  scroller.scrollTop = section.offsetTop;
  scroller.style.scrollBehavior = previousBehavior;
}

function useScrollRoutes() {
  const initialRoute = useMemo(() => requestedRoute(), []);
  const [activeRoute, setActiveRoute] = useState(initialRoute);
  const activeRef = useRef(initialRoute);
  const scrollerRef = useRef(null);

  const setActive = (route) => {
    activeRef.current = route;
    setActiveRoute(route);
  };

  const scrollToRoute = (route, { historyMode = "push", behavior = "smooth" } = {}) => {
    if (!ROUTE_IDS.has(route)) return;
    const section = document.getElementById(`psb-${route}`);
    if (!section || !scrollerRef.current) return;

    setActive(route);
    updateRouteInUrl(route, historyMode);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || behavior === "auto") {
      jumpToSection(scrollerRef.current, section);
      return;
    }
    scrollerRef.current.scrollTo({
      top: section.offsetTop,
      behavior,
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let frame = 0;
    let initializing = true;

    const updateFromScroll = () => {
      frame = 0;
      if (initializing) return;

      const scrollerTop = scroller.getBoundingClientRect().top;
      const probe = scrollerTop + Math.min(scroller.clientHeight * 0.32, 270);
      let nextRoute = ROUTES[0].id;

      ROUTES.forEach(({ id }) => {
        const section = document.getElementById(`psb-${id}`);
        if (section && section.getBoundingClientRect().top <= probe) nextRoute = id;
      });

      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 8) {
        nextRoute = ROUTES.at(-1).id;
      }

      if (nextRoute !== activeRef.current) {
        setActive(nextRoute);
        updateRouteInUrl(nextRoute, "replace");
      }
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFromScroll);
    };

    const handlePopState = () => {
      const nextRoute = requestedRoute();
      const section = document.getElementById(`psb-${nextRoute}`);
      setActive(nextRoute);
      if (section) jumpToSection(scroller, section);
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("popstate", handlePopState);

    const firstFrame = window.requestAnimationFrame(() => {
      const section = document.getElementById(`psb-${initialRoute}`);
      if (section) jumpToSection(scroller, section);
      updateRouteInUrl(initialRoute, "replace");
      window.requestAnimationFrame(() => {
        initializing = false;
        updateFromScroll();
      });
    });

    return () => {
      initializing = false;
      window.cancelAnimationFrame(firstFrame);
      if (frame) window.cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [initialRoute]);

  return { activeRoute, scrollerRef, scrollToRoute };
}

function PhaseRail({ activeRoute, data, onNavigate }) {
  const activeLinkRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activeLinkRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeRoute]);

  return (
    <aside className="psb-rail">
      <div className="psb-rail-head">
        <span>Navigator</span>
        <strong>{String(ROUTES.findIndex(({ id }) => id === activeRoute) + 1).padStart(2, "0")} / {String(ROUTES.length).padStart(2, "0")}</strong>
      </div>
      <nav aria-label="Portfolio sections">
        {ROUTES.map((route, index) => (
          <a
            aria-current={activeRoute === route.id ? "location" : undefined}
            href={`#psb-${route.id}`}
            key={route.id}
            ref={activeRoute === route.id ? activeLinkRef : undefined}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(route.id);
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{route.label}</strong>
            <small>{route.cue}</small>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>
      <footer>
        <strong>{data.profile.location}</strong>
        <a href={data.profile.linkedin} {...externalProps}>LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={`mailto:${data.profile.email}`}>Reach out <span aria-hidden="true">↗</span></a>
      </footer>
    </aside>
  );
}

function SectionHeading({ children, id, index, title }) {
  return (
    <header className="psb-section-heading">
      <p>{index} / {children}</p>
      <h2 id={id}>{title}</h2>
    </header>
  );
}

function Overview({ data, onNavigate }) {
  return (
    <section className="psb-route psb-overview" id="psb-overview" aria-labelledby="psb-title">
      <header className="psb-topline">
        <a href="#psb-overview" aria-label="Andre Souza, portfolio overview" onClick={(event) => { event.preventDefault(); onNavigate("overview"); }}>
          <span className="psb-signature-mark signature-wordmark signature-wordmark--inverse" aria-hidden="true" />
          <span><strong>Andre Souza</strong><small>Applied mathematics / scientific ML</small></span>
        </a>
        <a href={data.profile.cv} download>CV <span aria-hidden="true">↗</span></a>
      </header>

      <div className="psb-hero">
        <div className="psb-hero-copy">
          <p>Scientific ML <span>×</span> AI Physics <span>×</span> Applied mathematics</p>
          <h1 id="psb-title">Scientific machine learning for physical systems.</h1>
          <p>{data.profile.summary} {data.profile.bridge}</p>
          <div className="psb-hero-actions">
            <button className="psb-glow-surface" onClick={() => onNavigate("work")} type="button">Explore selected work <span aria-hidden="true">↓</span></button>
            <button className="psb-glow-surface" onClick={() => onNavigate("papers")} type="button">Explore academic research <span aria-hidden="true">↓</span></button>
          </div>
        </div>
        <div className="psb-lorenz">
          <LorenzAttractor onOriginActivate={() => onNavigate("papers")} />
        </div>
      </div>

      <div className="psb-proof" aria-label="Career highlights">
        {data.proof.map((item) => item.route ? (
          <button aria-label={`Go to ${item.label}`} className="psb-glow-surface" key={item.label} onClick={() => onNavigate(item.route)} type="button">
            <strong>{item.value}</strong><span>{item.label}</span>
          </button>
        ) : item.url ? (
          <a aria-label={`Visit ${item.value}`} className="psb-glow-surface" href={item.url} key={item.label} {...externalProps}>
            <strong>{item.value}</strong><span>{item.label}</span>
          </a>
        ) : <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
      </div>
    </section>
  );
}

function Papers({ data }) {
  const [collection, setCollection] = useState("articles");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("selected");
  const [citationPaper, setCitationPaper] = useState(null);
  const citationTriggerRef = useRef(null);
  const searchId = `psb-research-search-${useId().replace(/:/g, "")}`;
  const records = collection === "articles" ? data.published : data.preprints;
  const collectionLabel = collection === "articles" ? "articles" : "preprints";
  const years = useMemo(
    () => collection === "articles"
      ? [...new Set(records.map((paper) => String(paper.year)))].sort((left, right) => Number(right) - Number(left))
      : [],
    [collection, records],
  );
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return records
      .filter((paper) => {
        if (view === "selected") return Boolean(paper.selected);
        if (view === "all") return true;
        return String(paper.year) === view;
      })
      .filter((paper) => {
        if (!normalizedQuery) return true;
        return [paper.title, paper.authors, paper.venue, paper.citation, paper.topic, paper.year, paper.summary]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      })
      .sort((left, right) => Number(right.year) - Number(left.year) || left.title.localeCompare(right.title));
  }, [query, records, view]);
  const grouped = useMemo(() => {
    if (collection === "preprints") return [{ year: null, papers: filtered }];
    const result = [];
    filtered.forEach((paper) => {
      const paperYear = String(paper.year);
      const current = result.at(-1);
      if (current?.year === paperYear) current.papers.push(paper);
      else result.push({ year: paperYear, papers: [paper] });
    });
    return result;
  }, [collection, filtered]);

  const chooseCollection = (nextCollection) => {
    setCollection(nextCollection);
    setQuery("");
    setView(nextCollection === "articles" ? "selected" : "all");
  };

  const resultHeading = query.trim()
    ? "Search results"
    : view === "selected"
      ? "Selected articles"
      : view === "all"
        ? collection === "articles" ? "All articles" : "Preprints"
        : `${collection === "articles" ? "Articles" : "Preprints"} from ${view}`;

  return (
    <section className="psb-route psb-papers" id="psb-papers" aria-labelledby="psb-papers-title">
      <AttractorDivider system="rossler" />
      <SectionHeading id="psb-papers-title" index="03" title="Research">Academic research</SectionHeading>

      <div className="psb-research-browser">
        <div className="psb-research-toolbar">
          <div className="psb-research-collections" aria-label="Research collection" role="group">
            <button aria-pressed={collection === "articles"} className="psb-glow-surface" onClick={() => chooseCollection("articles")} type="button">
              <span>Journal articles</span><strong>{data.published.length}</strong>
            </button>
            <button aria-pressed={collection === "preprints"} className="psb-glow-surface" onClick={() => chooseCollection("preprints")} type="button">
              <span>Preprints</span><strong>{data.preprints.length}</strong>
            </button>
          </div>

          <div className="psb-research-search">
            <label htmlFor={searchId}>Search research</label>
            <div>
              <span aria-hidden="true">⌕</span>
              <input
                id={searchId}
                onChange={(event) => {
                  const nextQuery = event.target.value;
                  setQuery(nextQuery);
                  if (nextQuery.trim() && collection === "articles" && view === "selected") setView("all");
                }}
                placeholder="Title, author, topic, or journal"
                type="search"
                value={query}
              />
              {query ? <button aria-label="Clear research search" onClick={() => setQuery("")} type="button">Clear</button> : null}
            </div>
          </div>
        </div>

        {collection === "articles" ? (
          <div className="psb-research-filter">
            <span>View</span>
            <div aria-label={`Filter ${collectionLabel}`} role="group">
              <button aria-pressed={view === "selected"} className="psb-glow-surface" onClick={() => setView("selected")} type="button">Selected</button>
              <button aria-pressed={view === "all"} className="psb-glow-surface" onClick={() => setView("all")} type="button">All</button>
              {years.map((item) => (
                <button aria-pressed={view === item} className="psb-glow-surface" key={item} onClick={() => setView(item)} type="button">{item}</button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="psb-research-results-heading">
          <strong>{resultHeading}</strong>
          <span aria-live="polite">{filtered.length} of {records.length} {collectionLabel}</span>
        </div>

        {grouped.length ? (
          <div className="psb-research-results">
            {grouped.map((group) => (
              <section
                aria-label={collection === "preprints" ? "Preprints" : undefined}
                aria-labelledby={collection === "articles" ? `psb-research-year-${collection}-${group.year}` : undefined}
                className={`psb-research-year${collection === "preprints" ? " is-flat" : ""}`}
                key={group.year || "preprints"}
              >
                {collection === "articles" ? <header><h3 id={`psb-research-year-${collection}-${group.year}`}>{group.year}</h3><span>{group.papers.length}</span></header> : null}
                <ol>
                  {group.papers.map((paper, index) => (
                    <li className={`psb-glow-surface${paper.selected ? " is-selected" : ""}`} key={paper.doi || paper.url || paper.title}>
                      <article className="psb-paper-entry">
                        <span className="psb-paper-index">{String(index + 1).padStart(2, "0")}</span>
                        <div className="psb-paper-copy">
                          <small>{collection === "articles" ? "Published article" : "Preprint"} · {paper.topic}</small>
                          <strong>{paper.title}</strong>
                          {paper.authors ? <em>{paper.authors}</em> : null}
                          {paper.venue ? <b>{paper.venue} · {paper.citation}</b> : null}
                          {paper.summary ? (
                            <details className="psb-paper-summary">
                              <summary>About this paper<span className="psb-sr-only">: {paper.title}</span></summary>
                              <p>{paper.summary}</p>
                            </details>
                          ) : null}
                        </div>
                        <div aria-label={`Actions for ${paper.title}`} className="psb-paper-actions" role="group">
                          <a href={paper.pdf} {...externalProps}>PDF</a>
                          <button onClick={(event) => { citationTriggerRef.current = event.currentTarget; setCitationPaper(paper); }} type="button">Cite</button>
                          <a href={paper.doi || paper.url} {...externalProps}>DOI</a>
                        </div>
                      </article>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        ) : (
          <div className="psb-research-empty">
            <strong>No matching research found.</strong>
            <p>Try a different title, author, topic, journal, or year.</p>
            <button onClick={() => { setQuery(""); setView(collection === "articles" ? "selected" : "all"); }} type="button">Clear filters</button>
          </div>
        )}

        <a className="psb-archive psb-glow-surface" href={data.profile.scholar} {...externalProps}>View the full publication record on Google Scholar <span aria-hidden="true">↗</span></a>
      </div>

      {citationPaper ? <CitationDialog onDismiss={() => setCitationPaper(null)} paper={citationPaper} returnFocusTo={citationTriggerRef.current} /> : null}
    </section>
  );
}

function Work({ data }) {
  return (
    <section className="psb-route psb-work" id="psb-work" aria-labelledby="psb-work-title">
      <AttractorDivider system="thomas" />
      <header className="psb-section-heading psb-section-heading--single">
        <h2 id="psb-work-title">Selected work</h2>
      </header>
      <p className="psb-section-lede psb-section-lede--single">Research, software, and applied AI work across academic and industrial settings.</p>
      <WorkStories stories={data.stories} />
    </section>
  );
}

function Background({ data }) {
  return (
    <section className="psb-route psb-background" id="psb-background" aria-labelledby="psb-background-title">
      <AttractorDivider system="chen" />
      <SectionHeading id="psb-background-title" index="04" title="Experience across research and engineering.">Background</SectionHeading>
      <p className="psb-section-lede">A technical career spanning academic research and applied scientific machine learning.</p>
      <div className="psb-timeline">
        {data.experience.map((item) => (
          <a aria-label={`${item.status}: ${item.role} at ${item.organization}`} className="psb-timeline-row psb-glow-surface" href={item.url} key={`${item.organization}-${item.period}`} {...externalProps}>
            <span className="psb-timeline-stage">{item.status}</span><div><h3>{item.role}</h3><p>{item.organization}</p><small>{item.location}</small><em>{item.summary}</em></div>
          </a>
        ))}
      </div>
      <section className="psb-contact" aria-labelledby="psb-contact-title">
        <div><span>Contact coordinate</span><h3 id="psb-contact-title">Working on a difficult physical system?</h3><p>{data.positioning.audience}</p></div>
        <div><a href={`mailto:${data.profile.email}`}>{data.profile.email} <span aria-hidden="true">↗</span></a><nav aria-label="Professional profiles"><a href={data.profile.linkedin} {...externalProps}>LinkedIn ↗</a><a href={data.profile.github} {...externalProps}>GitHub ↗</a><a href={data.profile.scholar} {...externalProps}>Google Scholar ↗</a><a href={data.profile.cv}>Download CV ↓</a></nav></div>
      </section>
      <footer className="psb-footer"><span>© {new Date().getFullYear()} {data.profile.name}</span><span>Scientific ML · AI Physics · Applied mathematics</span></footer>
    </section>
  );
}

export function PhaseSwitchboard({ data }) {
  const { activeRoute, scrollerRef, scrollToRoute } = useScrollRoutes();

  return (
    <main className="portfolio-view phase-switchboard-view" data-view="phase-switchboard">
      <div className="psb-app" onPointerMove={positionPointerGlow}>
        <div aria-label="Scrollable portfolio content" className="psb-scroll" id="portfolio-main-panel" ref={scrollerRef} role="region" tabIndex={0}>
          <Overview data={data} onNavigate={scrollToRoute} />
          <Work data={data} />
          <Papers data={data} />
          <Background data={data} />
        </div>
        <PhaseRail activeRoute={activeRoute} data={data} onNavigate={scrollToRoute} />
      </div>
    </main>
  );
}

import React, { useEffect, useId, useRef, useState } from "react";

const citationCache = new Map();

function citationFilename(citationUrl) {
  const segments = citationUrl.split("/").filter(Boolean);
  const publicationIndex = segments.indexOf("publication");
  const slug = publicationIndex >= 0 ? segments[publicationIndex + 1] : "citation";
  return `${slug || "citation"}.bib`;
}

function copyWithFallback(value, container = document.body) {
  const previousFocus = document.activeElement;
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  container.appendChild(textarea);
  textarea.focus({ preventScroll: true });
  textarea.select();
  textarea.setSelectionRange(0, value.length);
  const copied = typeof document.execCommand === "function" && document.execCommand("copy");
  textarea.remove();
  previousFocus?.focus?.({ preventScroll: true });
  return copied;
}

function writeToClipboard(value) {
  const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : null;
  if (!clipboard?.writeText) return Promise.reject(new Error("Clipboard access is unavailable."));

  return Promise.race([
    clipboard.writeText(value),
    new Promise((_, reject) => window.setTimeout(() => reject(new Error("Clipboard access timed out.")), 1500)),
  ]);
}

export function CitationDialog({ onDismiss, paper, returnFocusTo }) {
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = `psb-citation-title-${useId().replace(/:/g, "")}`;
  const descriptionId = `${titleId}-description`;
  const statusId = `${titleId}-status`;
  const [bibtex, setBibtex] = useState("");
  const [loadState, setLoadState] = useState("loading");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    returnFocusRef.current = returnFocusTo || document.activeElement;
    document.body.classList.add("psb-modal-open");
    dialog?.showModal();

    return () => {
      document.body.classList.remove("psb-modal-open");
      returnFocusRef.current?.focus?.();
    };
  }, [returnFocusTo]);

  useEffect(() => {
    const controller = new AbortController();
    const cachedCitation = citationCache.get(paper.cite);

    setBibtex(cachedCitation || "");
    setLoadState(cachedCitation ? "ready" : "loading");
    setCopyStatus("");

    if (!cachedCitation) {
      fetch(paper.cite, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`Citation request failed (${response.status}).`);
          return response.text();
        })
        .then((value) => {
          citationCache.set(paper.cite, value);
          setBibtex(value);
          setLoadState("ready");
        })
        .catch((error) => {
          if (error.name !== "AbortError") setLoadState("error");
        });
    }

    return () => controller.abort();
  }, [paper.cite]);

  const copyCitation = async () => {
    if (!bibtex) return;
    try {
      const copied = copyWithFallback(bibtex, dialogRef.current || document.body);
      if (!copied) await writeToClipboard(bibtex);
      setCopyStatus("BibTeX copied to clipboard.");
    } catch {
      setCopyStatus("Copy failed. Select the citation text and copy it manually.");
    }
  };

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="psb-citation-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss();
      }}
      ref={dialogRef}
    >
      <div className="psb-citation-dialog__panel">
        <header>
          <div>
            <span>BibTeX record</span>
            <h2 id={titleId}>Cite</h2>
          </div>
          <button aria-label="Close citation dialog" autoFocus onClick={onDismiss} type="button">×</button>
        </header>

        <p id={descriptionId}>{paper.title}</p>

        <span aria-live="polite" className="psb-sr-only" role="status">
          {loadState === "loading" ? "Loading citation." : loadState === "ready" ? "Citation loaded." : "Citation could not be loaded."}
        </span>

        <div aria-busy={loadState === "loading"} className="psb-citation-dialog__record">
          {loadState === "loading" ? <p>Loading citation…</p> : null}
          {loadState === "error" ? <p>That citation could not be loaded. You can still download the BibTeX file below.</p> : null}
          {loadState === "ready" ? <pre tabIndex="0"><code>{bibtex}</code></pre> : null}
        </div>

        <footer>
          <span aria-live="polite" id={statusId}>{copyStatus}</span>
          <div>
            <button disabled={loadState !== "ready"} onClick={copyCitation} type="button">Copy BibTeX</button>
            <a download={citationFilename(paper.cite)} href={paper.cite}>Download .bib</a>
          </div>
        </footer>
      </div>
    </dialog>
  );
}

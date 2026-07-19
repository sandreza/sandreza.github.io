import React, { useEffect } from "react";
import { PhaseSwitchboard } from "./concepts/navigation_phase.jsx";

const PUBLIC_DESIGN = "phase-switchboard";
const PUBLIC_PALETTE = "cobalt";
const PUBLIC_THEME = "#070b1a";

export function FinalPortfolioApp({ data }) {
  useEffect(() => {
    document.documentElement.classList.add("portfolio-final");
    document.body.classList.add("portfolio-final");
    document.body.classList.remove("design-lab-collapsed", "has-palette-picker");
    document.documentElement.classList.remove("has-palette-picker");
    document.body.dataset.design = PUBLIC_DESIGN;
    document.body.dataset.palette = PUBLIC_PALETTE;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", PUBLIC_THEME);
    document.querySelector(".skip-link")?.setAttribute("href", "#portfolio-main-panel");
    document.title = "Andre Souza | Scientific ML & Applied Mathematics";

    const url = new URL(window.location.href);
    const prototypeKeys = ["design", "palette", "lab"];
    const hadPrototypeParams = prototypeKeys.some((key) => url.searchParams.has(key));
    prototypeKeys.forEach((key) => url.searchParams.delete(key));
    if (hadPrototypeParams) {
      window.history.replaceState(
        { ...(window.history.state || {}), design: PUBLIC_DESIGN },
        "",
        url,
      );
    }
  }, []);

  return <PhaseSwitchboard data={data} />;
}

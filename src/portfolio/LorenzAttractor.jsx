import React, { useEffect, useId, useMemo, useState } from "react";

function derivative([x, y, z]) {
  const sigma = 10;
  const rho = 28;
  const beta = 8 / 3;
  return [sigma * (y - x), x * (rho - z) - y, x * y - beta * z];
}

function rk4(point, step) {
  const k1 = derivative(point);
  const p2 = point.map((value, index) => value + (step * k1[index]) / 2);
  const k2 = derivative(p2);
  const p3 = point.map((value, index) => value + (step * k2[index]) / 2);
  const k3 = derivative(p3);
  const p4 = point.map((value, index) => value + step * k3[index]);
  const k4 = derivative(p4);
  return point.map(
    (value, index) => value + (step / 6) * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index]),
  );
}

function integrate(initial, step, count, discard = 0, sampleEvery = 1) {
  let point = initial;
  const points = [];
  for (let index = 0; index < count + discard; index += 1) {
    point = rk4(point, step);
    if (index >= discard && (index - discard) % sampleEvery === 0) points.push(point);
  }
  return points;
}

function projectPoint([x, y, z], angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const rotatedX = x * cosine - y * sine;
  const rotatedY = x * sine + y * cosine;
  return [300 + rotatedX * 9.1, 555 - z * 10.05 + rotatedY * 1.55];
}

function project(points, angle) {
  return points.map((point, index) => {
    const [screenX, screenY] = projectPoint(point, angle);
    return `${index === 0 ? "M" : "L"}${screenX.toFixed(1)},${screenY.toFixed(1)}`;
  }).join(" ");
}

export function LorenzAttractor({ onOriginActivate }) {
  const [angle, setAngle] = useState(-0.2);
  const [engaged, setEngaged] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const gradientId = useId().replace(/:/g, "");
  const descriptionId = `${gradientId}-description`;

  const trajectories = useMemo(() => {
    const attractor = integrate([0.1, 0, 0], 0.006, 7900, 2400, 2);
    const period = 1.55865222;
    const steps = 720;
    const orbit = integrate([13.76361068, 19.57875194, 27], period / steps, steps + 1);
    return { attractor, orbit };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let frame;
    let previous = 0;
    const animate = (time) => {
      if (time - previous > 45) {
        setAngle((value) => value + (engaged ? 0.008 : 0.0035));
        previous = time;
      }
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [engaged, reducedMotion]);

  const attractorPath = useMemo(() => project(trajectories.attractor, angle), [angle, trajectories.attractor]);
  const orbitPath = useMemo(() => project(trajectories.orbit, angle), [angle, trajectories.orbit]);
  const [lobeA, lobeB] = useMemo(() => {
    const equilibrium = Math.sqrt((8 / 3) * 27);
    return [
      projectPoint([equilibrium, equilibrium, 27], angle),
      projectPoint([-equilibrium, -equilibrium, 27], angle),
    ];
  }, [angle]);
  const origin = useMemo(() => projectPoint([0, 0, 0], angle), [angle]);

  return (
    <figure
      className={`phase-instrument phase-lorenz-instrument is-minimal${engaged ? " is-engaged" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false);
      }}
      onFocus={() => setEngaged(true)}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setEngaged(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setEngaged(false);
      }}
    >
      <svg aria-labelledby={`${gradientId}-title ${descriptionId}`} role="img" viewBox="0 0 600 600">
        <title id={`${gradientId}-title`}>Lorenz attractor with the AB periodic orbit</title>
        <desc id={descriptionId}>
          A numerical trajectory of the standard Lorenz system with its unstable AB periodic orbit highlighted.
        </desc>
        <defs>
          <linearGradient id={`${gradientId}-attractor`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--phase-cyan)" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="var(--phase-purple)" stopOpacity="0.68" />
            <stop offset="1" stopColor="var(--phase-cyan)" stopOpacity="0.28" />
          </linearGradient>
          <filter height="180%" id={`${gradientId}-glow`} width="180%" x="-40%" y="-40%">
            <feGaussianBlur result="blur" stdDeviation={engaged ? 5 : 3} />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={attractorPath} opacity={engaged ? 0.92 : 0.72} stroke={`url(#${gradientId}-attractor)`} strokeWidth={engaged ? 1.35 : 1} />
          <path d={orbitPath} filter={`url(#${gradientId}-glow)`} opacity="0.98" stroke="var(--phase-warm)" strokeWidth={engaged ? 4.2 : 3.2} />
        </g>
        <g aria-hidden="true" className="phase-fixed-points">
          <circle cx={lobeA[0]} cy={lobeA[1]} r="5" />
          <circle cx={lobeB[0]} cy={lobeB[1]} r="5" />
        </g>
      </svg>
      <div aria-hidden="true" className="phase-lorenz-glow" />
      {onOriginActivate ? (
        <button
          aria-label="Jump to academic research from the Lorenz-system origin"
          className="phase-origin-jump"
          onClick={onOriginActivate}
          style={{ left: `${(origin[0] / 600) * 100}%`, top: `${(origin[1] / 600) * 100}%` }}
          type="button"
        ><span aria-hidden="true" /></button>
      ) : null}
    </figure>
  );
}

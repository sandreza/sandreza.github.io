import assert from 'node:assert/strict';
import { derivatives, periodicOrbits, periodicTrajectory } from '../src/portfolio/dynamics.js';

for (const [name, orbit] of Object.entries(periodicOrbits)) {
  const points = periodicTrajectory(name);
  const refined = periodicTrajectory(name, 2);
  const distance = (a, b) => Math.hypot(...a.map((x, index) => x - b[index]));
  const closure = distance(points[0], points.at(-1));
  const refinedClosure = distance(refined[0], refined.at(-1));
  const convergence = distance(points.at(-1), refined.at(-1));
  assert(points.every(point => point.every(Number.isFinite)), `${name}: nonfinite trajectory`);
  assert(closure < 1e-7 && refinedClosure < 1e-7, `${name}: orbit does not close`);
  assert(convergence < 1e-7, `${name}: time-step refinement failed`);
  assert(Math.max(...points.map(point => distance(point, points[0]))) > 0.1, `${name}: equilibrium rather than periodic motion`);
  assert(Math.hypot(...derivatives[name](orbit.initial)) > 0.05, `${name}: stationary initial state`);
  console.log(`${name}: T=${orbit.period.toFixed(12)}, closure=${closure.toExponential(3)}, refinement difference=${convergence.toExponential(3)}`);
}

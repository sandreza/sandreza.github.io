import periodicOrbits from "./periodic-orbits.json" with { type: "json" };

// These vector fields are shared by the chaotic trajectories, highlighted
// periodic solutions, and numerical checks. Parameters must agree throughout.
export const derivatives = {
  lorenz: ([x, y, z]) => [10 * (y - x), x * (28 - z) - y, x * y - (8 / 3) * z],
  rossler: ([x, y, z]) => [-y - z, x + 0.2 * y, 0.2 + z * (x - 5.7)],
  thomas: ([x, y, z]) => [Math.sin(y) - 0.208186 * x, Math.sin(z) - 0.208186 * y, Math.sin(x) - 0.208186 * z],
  chen: ([x, y, z]) => [35 * (y - x), -7 * x - x * z + 28 * y, x * y - 3 * z],
};

export function rk4Step(point, step, derivative) {
  const shift = (vector, scale) => point.map((value, index) => value + scale * vector[index]);
  const k1 = derivative(point);
  const k2 = derivative(shift(k1, step / 2));
  const k3 = derivative(shift(k2, step / 2));
  const k4 = derivative(shift(k3, step));
  return point.map((value, index) => value + step * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index]) / 6);
}

export function periodicTrajectory(system, refinement = 1) {
  const orbit = periodicOrbits[system];
  const steps = Math.ceil(orbit.period / orbit.maxStep) * refinement;
  const stride = Math.max(1, Math.floor(steps / 1400));
  const points = [orbit.initial];
  let point = orbit.initial;
  for (let index = 1; index <= steps; index += 1) {
    point = rk4Step(point, orbit.period / steps, derivatives[system]);
    if (index % stride === 0 || index === steps) points.push(point);
  }
  // Include the actual endpoint after exactly T; never force the curve closed.
  return points;
}

export { periodicOrbits };

"""Independently check periodic-orbits.json with SciPy's adaptive DOP853 solver.

Requires numpy and scipy. Run from any directory with:
    python3 scripts/verify-periodic-orbits.py
This is a numerical verification, not an interval-arithmetic existence proof.
"""
import json
from pathlib import Path
import numpy as np
from scipy.integrate import solve_ivp

ORBITS = Path(__file__).resolve().parents[1] / 'src/portfolio/periodic-orbits.json'
SYSTEMS = {
    'lorenz': (
        lambda x, y, z: [10 * (y - x), x * (28 - z) - y, x * y - 8 / 3 * z],
        lambda x, y, z: [[-10, 10, 0], [28 - z, -1, -x], [y, x, -8 / 3]],
    ),
    'rossler': (
        lambda x, y, z: [-y - z, x + .2 * y, .2 + z * (x - 5.7)],
        lambda x, y, z: [[0, -1, -1], [1, .2, 0], [z, 0, x - 5.7]],
    ),
    'thomas': (
        lambda x, y, z: [np.sin(y) - .208186 * x, np.sin(z) - .208186 * y, np.sin(x) - .208186 * z],
        lambda x, y, z: [[-.208186, np.cos(y), 0], [0, -.208186, np.cos(z)], [np.cos(x), 0, -.208186]],
    ),
    'chen': (
        lambda x, y, z: [35 * (y - x), -7 * x - x * z + 28 * y, x * y - 3 * z],
        lambda x, y, z: [[-35, 35, 0], [-7 - z, 28, -x], [y, x, -3]],
    ),
}

for name, orbit in json.loads(ORBITS.read_text()).items():
    vector, jacobian = SYSTEMS[name]
    initial, period = np.array(orbit['initial']), orbit['period']
    def augmented_rhs(t, state):
        point = state[:3]
        tangent = state[3:].reshape(3, 3)
        return np.r_[vector(*point), (np.array(jacobian(*point)) @ tangent).ravel()]
    result = solve_ivp(
        augmented_rhs, [0, period], np.r_[initial, np.eye(3).ravel()],
        method='DOP853', rtol=2.5e-13, atol=2.5e-15,
        t_eval=np.linspace(0, period, 1201),
    )
    assert result.success
    closure = np.linalg.norm(result.y[:3, -1] - initial)
    excursion = np.max(np.linalg.norm(result.y[:3].T - initial, axis=1))
    multipliers = np.linalg.eigvals(result.y[3:, -1].reshape(3, 3))
    assert closure < 1e-7, (name, closure)
    assert excursion > .1, (name, 'stationary solution')
    assert min(abs(multipliers - 1)) < 1e-5, (name, 'missing neutral flow multiplier')
    assert max(abs(multipliers)) > 1.01, (name, 'not an unstable periodic orbit')
    print(f'{name}: closure={closure:.3e}; Floquet multipliers={multipliers}')

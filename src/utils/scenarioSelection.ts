import type { Scenario } from "../types/scenario";

export function pickRandom(scenarios: Scenario[], exclude: Scenario | null, passedIds: string[]): Scenario | null {
    if (!scenarios.length) return null;
    const pool = exclude ? scenarios.filter(s => s !== exclude) : scenarios;
    if (!pool.length) return exclude;
    const untested = pool.filter(s => !passedIds.includes(s.id));
    const candidates = untested.length ? untested : pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
}

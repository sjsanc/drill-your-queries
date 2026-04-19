import type { Scenario } from "../types/scenario";
import type { SM2Grade, SM2Record, SM2Store } from "../types/spacedRepetition";
import { shortcodeFromPrompt } from "./scenarios";

/** Composite key scoping an SM2 record to a specific schema. */
export function sm2Key(schemaId: string, shortcode: string): string {
    return `${schemaId}:${shortcode}`;
}

/** Applies a single SM2 review and returns the updated record. */
export function updateSM2(record: SM2Record | undefined, grade: SM2Grade, now: number): SM2Record {
    const prev = record ?? {
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        dueAt: 0,
        lastAttemptAt: 0,
    };

    let { interval, easeFactor, repetitions } = prev;

    if (grade >= 3) {
        if (repetitions === 0) interval = 1;
        else if (repetitions === 1) interval = 6;
        else interval = Math.round(interval * easeFactor);
        repetitions++;
    } else {
        repetitions = 0;
        interval = 1;
    }

    easeFactor = Math.max(
        1.3,
        easeFactor + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02),
    );

    return {
        interval,
        easeFactor,
        repetitions,
        dueAt: now + interval * 86_400_000,
        lastAttemptAt: now,
    };
}

/**
 * Picks the next scenario using SM2 priority: overdue first, then unseen,
 * then future-scheduled. Never returns the currently active scenario.
 */
export function pickWithSR(
    scenarios: Scenario[],
    exclude: Scenario | null,
    store: SM2Store,
    schemaId: string,
    now = Date.now(),
): Scenario | null {
    const pool = exclude ? scenarios.filter((s) => s !== exclude) : scenarios;
    if (!pool.length) return exclude;

    const key = (s: Scenario) => sm2Key(schemaId, shortcodeFromPrompt(s.prompt));

    const due = pool.filter((s) => { const r = store[key(s)]; return r && r.dueAt <= now; });
    const fresh = pool.filter((s) => !store[key(s)]);
    const learning = pool.filter((s) => { const r = store[key(s)]; return r && r.dueAt > now; });

    const candidates = due.length ? due : fresh.length ? fresh : learning;
    return candidates[Math.floor(Math.random() * candidates.length)] ?? null;
}

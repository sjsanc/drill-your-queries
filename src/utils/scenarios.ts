import type { EngineId } from "@/types/engine";
import type { Scenario } from "@/types/scenario";

/** Deterministic 6-character hash of a scenario prompt used as a stable identifier. */
export function shortcodeFromPrompt(prompt: string): string {
    let h = 5381;
    for (let i = 0; i < prompt.length; i++) {
        h = (Math.imul(h, 33) ^ prompt.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(36).slice(0, 6).padStart(6, "0");
}

/** Narrows a scenario list to those supported by the given engine. */
export function filterScenariosForEngine(scenarios: Scenario[], engineId: EngineId): Scenario[] {
    return scenarios.filter(
        (s) => !s.engines || (s.engines as string[]).includes(engineId),
    );
}

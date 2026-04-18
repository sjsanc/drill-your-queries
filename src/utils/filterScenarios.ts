import type { EngineId } from "../types/engine";
import type { Scenario } from "../types/scenario";

export function filterScenariosForEngine(
    scenarios: Scenario[],
    engineId: EngineId,
): Scenario[] {
    return scenarios.filter(
        (s) => !s.engines || (s.engines as string[]).includes(engineId),
    );
}

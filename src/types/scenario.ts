import type { ConceptId, EngineTag } from "./concepts";

export interface Scenario {
    prompt: string;
    concepts: ConceptId[];
    expectedSql: string;
    hints?: string[];
    engines?: EngineTag[];
}

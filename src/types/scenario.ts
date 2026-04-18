import type { ConceptId, EngineTag } from "./concepts";

export interface Scenario {
    id: string;
    prompt: string;
    concepts: ConceptId[];
    expectedSql: string;
    hints?: string[];
    engines?: EngineTag[];
}

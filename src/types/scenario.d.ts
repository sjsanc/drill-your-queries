import type { ConceptId, EngineTag } from "@/types/concepts";

export interface Scenario {
    prompt: string;
    concepts: ConceptId[];
    expectedSql: string;
    hints?: string[];
    engines?: EngineTag[];
}

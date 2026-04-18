import type { ConceptId } from "./concepts";

export interface Scenario {
    id: string;
    prompt: string;
    concepts: ConceptId[];
    difficulty: 1 | 2 | 3;
    expectedSql: string;
    hints?: string[];
}

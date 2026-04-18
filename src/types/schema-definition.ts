import type { EngineId } from "./engine";
import type { Scenario } from "./scenario";

export interface ISchemaDefinition {
    id: string;
    name: string;
    sql: string | Partial<Record<EngineId, string>>;
    scenarios: Scenario[];
}

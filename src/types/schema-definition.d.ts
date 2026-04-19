import type { EngineId } from "@/types/engine";
import type { Scenario } from "@/types/scenario";

export interface ISchemaDefinition {
    id: string;
    name: string;
    sql: string | Partial<Record<EngineId, string>>;
    scenarios: Scenario[];
}

import type { Scenario } from "./scenario";

export interface ISchemaDefinition {
    id: string;
    name: string;
    sql: string;
    scenarios: Scenario[];
}

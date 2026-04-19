import type { ISchemaDefinition } from "@/types/schema-definition";
import { hrScenarios } from "@/data/hr/scenarios";
import pgSql from "@/data/hr/pg.sql?raw";
import sqliteSql from "@/data/hr/sqlite.sql?raw";

export const hrSchema: ISchemaDefinition = {
    id: "hr",
    name: "HR",
    sql: { sqlite: sqliteSql, pg: pgSql },
    scenarios: hrScenarios,
};

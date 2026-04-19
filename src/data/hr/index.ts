import type { ISchemaDefinition } from "../../types/schema-definition";
import { hrScenarios } from "./scenarios";
import pgSql from "./pg.sql?raw";
import sqliteSql from "./sqlite.sql?raw";

export const hrSchema: ISchemaDefinition = {
    id: "hr",
    name: "HR",
    sql: { sqlite: sqliteSql, pg: pgSql },
    scenarios: hrScenarios,
};

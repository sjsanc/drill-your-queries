import type { ISchemaDefinition } from "../../types/schema-definition";
import sqliteSql from "./sqlite.sql?raw";

export const hrSchema: ISchemaDefinition = {
    id: "hr",
    name: "HR",
    sql: sqliteSql,
    scenarios: [],
};

import type { ISchemaDefinition } from "../../types/schema-definition";
import { ecommerceScenarios } from "./scenarios";
import pgSql from "./pg.sql?raw";
import sqliteSql from "./sqlite.sql?raw";

export const ecommerceSchema: ISchemaDefinition = {
    id: "ecommerce",
    name: "E-Commerce",
    sql: { sqlite: sqliteSql, pg: pgSql },
    scenarios: ecommerceScenarios,
};

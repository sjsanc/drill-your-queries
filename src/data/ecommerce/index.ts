import type { ISchemaDefinition } from "@/types/schema-definition";
import { ecommerceScenarios } from "@/data/ecommerce/scenarios";
import pgSql from "@/data/ecommerce/pg.sql?raw";
import sqliteSql from "@/data/ecommerce/sqlite.sql?raw";

export const ecommerceSchema: ISchemaDefinition = {
    id: "ecommerce",
    name: "E-Commerce",
    sql: { sqlite: sqliteSql, pg: pgSql },
    scenarios: ecommerceScenarios,
};

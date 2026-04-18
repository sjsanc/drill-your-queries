import type { ISchemaDefinition } from "../types/schema-definition";
import { ecommerceScenarios } from "./ecommerce.scenarios";
import ecommercePgSql from "./ecommerce_pg.sql?raw";
import ecommerceSql from "./ecommerce.sql?raw";
import hrSql from "./hr.sql?raw";

export const ecommerceSchema: ISchemaDefinition = {
    id: "ecommerce",
    name: "E-Commerce",
    sql: { sqlite: ecommerceSql, pg: ecommercePgSql },
    scenarios: ecommerceScenarios,
};

export const hrSchema: ISchemaDefinition = {
    id: "hr",
    name: "HR",
    sql: hrSql,
    scenarios: [],
};

export const schemas: ISchemaDefinition[] = [ecommerceSchema, hrSchema];

import type { ISchemaDefinition } from "../types/schema-definition";
import ecommerceSql from "./ecommerce.sql?raw";
import hrSql from "./hr.sql?raw";
import { ecommerceScenarios } from "./ecommerce.scenarios";

export const ecommerceSchema: ISchemaDefinition = {
    id: "ecommerce",
    name: "E-Commerce",
    sql: ecommerceSql,
    scenarios: ecommerceScenarios,
};

export const hrSchema: ISchemaDefinition = {
    id: "hr",
    name: "HR",
    sql: hrSql,
    scenarios: [],
};

export const schemas: ISchemaDefinition[] = [ecommerceSchema, hrSchema];

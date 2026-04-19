export interface SchemaColumn {
    name: string;
    type: string;
}

export interface SchemaTable {
    name: string;
    columns: SchemaColumn[];
}

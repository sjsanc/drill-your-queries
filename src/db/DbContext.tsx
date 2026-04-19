import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { schemas } from "../data";
import type { EngineId, IDbEngine, QueryResult } from "../types/engine";
import type { SchemaTable } from "../types/schema";
import type { ISchemaDefinition } from "../types/schema-definition";
import { STORAGE_KEYS } from "../utils/storageKeys";

interface DbState {
    engineId: EngineId;
    schemaDef: ISchemaDefinition | null;
    schema: SchemaTable[];
    status: "initialising" | "ready" | "error";
    error: string | null;
}

type DbAction =
    | { type: "INIT_START"; engineId: EngineId; schemaDef: ISchemaDefinition }
    | { type: "INIT_DONE"; schema: SchemaTable[] }
    | { type: "INIT_ERROR"; error: string };

function reducer(state: DbState, action: DbAction): DbState {
    switch (action.type) {
        case "INIT_START":
            return {
                ...state,
                engineId: action.engineId,
                schemaDef: action.schemaDef,
                schema: [],
                status: "initialising",
                error: null,
            };
        case "INIT_DONE":
            return { ...state, schema: action.schema, status: "ready" };
        case "INIT_ERROR":
            return { ...state, status: "error", error: action.error };
    }
}

interface DbContextValue extends DbState {
    switchEngine(
        engineId: EngineId,
        schemaDef: ISchemaDefinition,
    ): Promise<void>;
    loadSchema(schemaDef: ISchemaDefinition): Promise<void>;
    query(sql: string): Promise<QueryResult>;
}

const DbContext = createContext<DbContextValue | null>(null);

interface DbProviderProps {
    initialEngineId: EngineId;
    initialSchema: ISchemaDefinition;
    children: React.ReactNode;
}

async function makeEngine(id: EngineId): Promise<IDbEngine> {
    if (id === "sqlite") {
        const { SqliteEngine } = await import("../db/sqlite");
        return new SqliteEngine();
    }
    if (id === "pg") {
        const { PgliteEngine } = await import("../db/pglite");
        return new PgliteEngine();
    }
    const { DuckdbEngine } = await import("../db/duckdb");
    return new DuckdbEngine();
}

export function DbProvider({
    initialEngineId,
    initialSchema,
    children,
}: DbProviderProps) {
    const [savedEngineId, setSavedEngineId] = useLocalStorage<EngineId>(
        STORAGE_KEYS.engineId,
        initialEngineId,
    );
    const [savedSchemaId, setSavedSchemaId] = useLocalStorage<string>(
        STORAGE_KEYS.schemaId,
        initialSchema.id,
    );

    const resolvedSchema =
        schemas.find((s) => s.id === savedSchemaId) ?? initialSchema;

    const [state, dispatch] = useReducer(reducer, {
        engineId: savedEngineId,
        schemaDef: resolvedSchema,
        schema: [],
        status: "initialising",
        error: null,
    });

    const engineRef = useRef<IDbEngine | null>(null);

    async function applySchema(
        engineId: EngineId,
        schemaDef: ISchemaDefinition,
    ) {
        dispatch({ type: "INIT_START", engineId, schemaDef });
        try {
            await engineRef.current?.destroy();
            const next = await makeEngine(engineId);
            await next.init();
            const sql =
                typeof schemaDef.sql === "string"
                    ? schemaDef.sql
                    : (schemaDef.sql[engineId] ??
                      (Object.values(schemaDef.sql)[0] as string));
            await next.exec(sql);
            const schema = await next.introspect();
            engineRef.current = next;
            dispatch({ type: "INIT_DONE", schema });
        } catch (e) {
            dispatch({ type: "INIT_ERROR", error: String(e) });
        }
    }

    async function switchEngine(
        engineId: EngineId,
        schemaDef: ISchemaDefinition,
    ) {
        setSavedEngineId(engineId);
        setSavedSchemaId(schemaDef.id);
        return applySchema(engineId, schemaDef);
    }

    async function loadSchema(schemaDef: ISchemaDefinition) {
        setSavedSchemaId(schemaDef.id);
        return applySchema(engineRef.current?.id ?? state.engineId, schemaDef);
    }

    async function query(sql: string): Promise<QueryResult> {
        if (!engineRef.current) throw new Error("No engine active");
        return engineRef.current.query(sql);
    }

    useEffect(() => {
        applySchema(savedEngineId, resolvedSchema);
    }, []);

    return (
        <DbContext.Provider
            value={{ ...state, switchEngine, loadSchema, query }}
        >
            {children}
        </DbContext.Provider>
    );
}

export function useDb(): DbContextValue {
    const ctx = useContext(DbContext);
    if (!ctx) throw new Error("useDb must be used within DbProvider");
    return ctx;
}

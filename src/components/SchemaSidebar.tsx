import { ChevronDown, ChevronRight, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useDb } from "../context/DbContext";
import type { EngineId } from "../types/engine";
import type { SchemaTable } from "../types/schema";
import { getTypeColor } from "../utils/typeColors";

interface SchemaSidebarProps {
    engine: EngineId;
    schema: SchemaTable[];
}

function TableEntry({
    table,
    engine,
    expanded,
    onToggle,
}: {
    table: SchemaTable;
    engine: EngineId;
    expanded: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-zinc-300 bg-white">
            <button
                onClick={onToggle}
                className="w-full px-2 py-1 text-sm flex items-center justify-between hover:bg-zinc-100 cursor-pointer"
            >
                {table.name}
                {expanded ? (
                    <ChevronDown size={15} />
                ) : (
                    <ChevronRight size={15} />
                )}
            </button>
            {expanded && (
                <div className="pb-2">
                    {table.columns.map((col) => (
                        <div
                            key={col.name}
                            className="pl-6 pr-2 py-0.5 font-mono text-xs flex items-center justify-between"
                        >
                            <span className="text-zinc-700">{col.name}</span>
                            <span className={getTypeColor(engine, col.type)}>
                                {col.type}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function SchemaSidebar({ engine, schema }: SchemaSidebarProps) {
    const { schemaDef } = useDb();
    const [expandedTables, setExpandedTables] = useState<Set<string>>(
        () => new Set(schema.map((t) => t.name)),
    );

    const allExpanded = expandedTables.size === schema.length;

    function toggleAll() {
        setExpandedTables(
            allExpanded ? new Set() : new Set(schema.map((t) => t.name)),
        );
    }

    function toggleTable(name: string) {
        setExpandedTables((prev) => {
            const next = new Set(prev);
            next.has(name) ? next.delete(name) : next.add(name);
            return next;
        });
    }

    return (
        <div className="h-full overflow-y-auto dot-grid">
            <div className="border-b border-zinc-300 px-2 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 flex items-center justify-between bg-white">
                <span>{schemaDef?.name ?? "Schema"}</span>
                <button
                    onClick={toggleAll}
                    className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                    <ChevronsUpDown size={13} />
                </button>
            </div>
            {schema.map((table) => (
                <TableEntry
                    key={table.name}
                    table={table}
                    engine={engine}
                    expanded={expandedTables.has(table.name)}
                    onToggle={() => toggleTable(table.name)}
                />
            ))}
        </div>
    );
}

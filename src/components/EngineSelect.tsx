import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, DatabaseIcon } from "lucide-react";
import { useDb } from "../context/DbContext";
import { ecommerceSchema } from "../schemas";
import type { EngineId } from "../types/engine";

const engines: { id: EngineId; label: string }[] = [
    { id: "sqlite", label: "SQLite" },
    { id: "pg", label: "PGlite" },
];

export default function EngineSelect() {
    const { engineId, schemaDef, status, switchEngine } = useDb();

    function handleChange(value: string) {
        const id = value as EngineId;
        switchEngine(id, schemaDef ?? ecommerceSchema);
    }

    return (
        <Select.Root
            value={engineId}
            onValueChange={handleChange}
            disabled={status === "initialising"}
        >
            <Select.Trigger className="flex items-center gap-1.5 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-2.5 py-1.5 rounded outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                <DatabaseIcon size={13} className="text-purple-400" />
                <Select.Value />
                <Select.Icon>
                    <ChevronDownIcon size={13} />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={4}
                    className="z-50 bg-zinc-800 border border-zinc-700 rounded shadow-lg overflow-hidden"
                >
                    <Select.Viewport>
                        {engines.map(({ id, label }) => (
                            <Select.Item
                                key={id}
                                value={id}
                                className="flex items-center px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-700 cursor-pointer outline-none data-[highlighted]:bg-zinc-700 data-[state=checked]:text-purple-400"
                            >
                                <Select.ItemText>{label}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

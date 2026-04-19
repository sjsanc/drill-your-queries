import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, Table2Icon } from "lucide-react";
import { useDb } from "@/db/DbContext";
import { schemas } from "@/data";

export default function SchemaSelect() {
    const { schemaDef, status, loadSchema } = useDb();

    return (
        <Select.Root
            value={schemaDef?.id}
            onValueChange={(id) => {
                const next = schemas.find((s) => s.id === id);
                if (next) loadSchema(next);
            }}
            disabled={status === "initialising"}
        >
            <Select.Trigger className="flex items-center gap-1.5 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-2.5 py-1.5 rounded outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                <Table2Icon size={13} className="text-purple-400" />
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
                        {schemas.map(({ id, name }) => (
                            <Select.Item
                                key={id}
                                value={id}
                                className="flex items-center px-3 py-1.5 text-sm text-zinc-300 cursor-pointer outline-none data-[highlighted]:bg-zinc-700 data-[state=checked]:text-purple-400"
                            >
                                <Select.ItemText>{name}</Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

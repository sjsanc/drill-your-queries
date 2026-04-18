import * as Popover from "@radix-ui/react-popover";
import { ChevronDownIcon, LightbulbIcon } from "lucide-react";
import { CONCEPT_GROUPS, type ConceptId } from "../types/concepts";
import type { EngineId } from "../types/engine";

interface ConceptSelectProps {
    selected: ConceptId[];
    onChange: (ids: ConceptId[]) => void;
    engineId: EngineId;
}

export default function ConceptSelect({
    selected,
    onChange,
    engineId,
}: ConceptSelectProps) {
    const visibleGroups = CONCEPT_GROUPS.map((group) => ({
        ...group,
        concepts: group.concepts.filter(
            (c) => c.engine === "generic" || c.engine === engineId,
        ),
    })).filter((g) => g.concepts.length > 0);

    const visibleIds = new Set(
        visibleGroups.flatMap((g) => g.concepts.map((c) => c.id)),
    );
    const activeSelected = selected.filter((id) => visibleIds.has(id));
    const isFiltered = activeSelected.length > 0;
    const allSelected = visibleIds.size > 0 && activeSelected.length === visibleIds.size;

    function toggle(id: ConceptId) {
        onChange(
            selected.includes(id)
                ? selected.filter((s) => s !== id)
                : [...selected, id],
        );
    }

    function selectAll() {
        onChange([...visibleIds] as ConceptId[]);
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="flex items-center gap-1.5 text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-2.5 py-1.5 rounded outline-none cursor-pointer">
                    <LightbulbIcon
                        size={13}
                        className={
                            isFiltered ? "text-purple-400" : "text-zinc-400"
                        }
                    />
                    Focus
                    {isFiltered && (
                        <span className="bg-purple-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full leading-none">
                            {activeSelected.length}
                        </span>
                    )}
                    <ChevronDownIcon size={13} />
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    side="bottom"
                    align="end"
                    sideOffset={4}
                    className="z-50 w-72 bg-zinc-800 border border-zinc-700 rounded shadow-xl overflow-hidden flex flex-col"
                >
                    <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-700">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                            Focus concepts
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={selectAll}
                                disabled={allSelected}
                                className="text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                All
                            </button>
                            <button
                                onClick={() => onChange([])}
                                disabled={!isFiltered}
                                className="text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-96">
                        {visibleGroups.map((group) => {
                            const groupIds = group.concepts.map(
                                (c) => c.id,
                            ) as ConceptId[];
                            const someGroupOn = groupIds.some((id) =>
                                selected.includes(id),
                            );

                            return (
                                <div key={group.category}>
                                    <div className="w-full flex items-center justify-between px-3 py-1.5 bg-zinc-900">
                                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                                            {group.category}
                                        </span>
                                        {someGroupOn && (
                                            <span className="text-xs text-purple-400">
                                                some
                                            </span>
                                        )}
                                    </div>
                                    {group.concepts.map((concept) => {
                                        const id = concept.id as ConceptId;
                                        return (
                                            <label
                                                key={id}
                                                className="flex items-center gap-2.5 px-4 py-1.5 hover:bg-zinc-700 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(
                                                        id,
                                                    )}
                                                    onChange={() => toggle(id)}
                                                    className="accent-purple-500 cursor-pointer"
                                                />
                                                <span className="text-xs text-zinc-300">
                                                    {concept.label}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

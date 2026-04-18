import * as Accordion from "@radix-ui/react-accordion";
import { CheckIcon, ChevronDownIcon, EyeIcon } from "lucide-react";
import { CONCEPTS, CONCEPT_GROUPS } from "../types/concepts";
import type { Scenario } from "../types/scenario";
import { shortcodeFromPrompt } from "../utils/shortcode";
import Badge from "./Badge";

interface HistoryViewProps {
    scenarios: Scenario[];
    passedIds: string[];
    revealedIds: string[];
    onJump: (scenario: Scenario) => void;
}

function conceptLabel(id: string): string {
    return CONCEPTS.find((c) => c.id === id)?.label ?? id;
}

export default function HistoryView({
    scenarios,
    passedIds,
    revealedIds,
    onJump,
}: HistoryViewProps) {
    const scenariosByCategory = CONCEPT_GROUPS.map((group) => {
        const groupConceptIds = new Set(group.concepts.map((c) => c.id));
        const grouped = scenarios.filter((s) =>
            s.concepts.some((c) => groupConceptIds.has(c)),
        );
        return { category: group.category, scenarios: grouped };
    }).filter((g) => g.scenarios.length > 0);

    return (
        <div className="flex-1 flex overflow-hidden dot-grid">
            <div className="flex-1 border-r border-zinc-200" />
            <div className="w-[1200px] shrink-0 bg-white border-x border-zinc-200 overflow-y-auto">
                <Accordion.Root type="multiple" className="w-full">
                    {scenariosByCategory.map(({ category, scenarios: group }) => {
                        const passedCount = group.filter((s) =>
                            passedIds.includes(s.id),
                        ).length;

                        return (
                            <Accordion.Item
                                key={category}
                                value={category}
                                className="border-b border-zinc-100"
                            >
                                <Accordion.Trigger className="w-full flex items-center gap-3 px-8 py-3 hover:bg-zinc-50 transition-colors group cursor-pointer [&[data-state=open]>svg]:rotate-180">
                                    <span className="text-sm font-medium text-zinc-700 flex-1 text-left">
                                        {category}
                                    </span>
                                    <span className="text-xs text-zinc-400">
                                        {passedCount}/{group.length} passed
                                    </span>
                                    <ChevronDownIcon
                                        size={14}
                                        className="text-zinc-400 transition-transform duration-200"
                                    />
                                </Accordion.Trigger>
                                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                                    <ul>
                                        {group.map((s) => {
                                            const passed = passedIds.includes(s.id);
                                            const revealed =
                                                !passed &&
                                                revealedIds.includes(s.id);
                                            return (
                                                <li
                                                    key={s.id}
                                                    onClick={() => onJump(s)}
                                                    className={`flex items-center gap-3 px-8 py-2.5 border-t border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors ${passed ? "" : "bg-zinc-50 hover:bg-zinc-100"}`}
                                                >
                                                    <Badge variant="shortcode">
                                                        {shortcodeFromPrompt(
                                                            s.prompt,
                                                        )}
                                                    </Badge>
                                                    <span className="text-sm flex-1 text-zinc-700">
                                                        {s.prompt}
                                                    </span>
                                                    {passed && (
                                                        <Badge
                                                            variant="passed"
                                                            icon={
                                                                <CheckIcon
                                                                    size={11}
                                                                />
                                                            }
                                                        >
                                                            Passed
                                                        </Badge>
                                                    )}
                                                    {revealed && (
                                                        <Badge
                                                            variant="revealed"
                                                            icon={
                                                                <EyeIcon
                                                                    size={11}
                                                                />
                                                            }
                                                        >
                                                            Revealed
                                                        </Badge>
                                                    )}
                                                    <div className="flex items-center gap-1 flex-wrap justify-end">
                                                        {s.concepts.map((c) => (
                                                            <Badge
                                                                key={c}
                                                                variant="concept"
                                                            >
                                                                {conceptLabel(c)}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Accordion.Content>
                            </Accordion.Item>
                        );
                    })}
                </Accordion.Root>
            </div>
            <div className="flex-1 border-l border-zinc-200" />
        </div>
    );
}

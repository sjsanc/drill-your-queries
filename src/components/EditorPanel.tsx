import * as Tooltip from "@radix-ui/react-tooltip";
import {
    CheckIcon,
    EyeIcon,
    PlayIcon,
    RefreshCwIcon,
    StepForwardIcon,
    WandSparklesIcon,
} from "lucide-react";
import { useDb } from "../context/DbContext";
import type { QueryResult } from "../types/engine";
import type { Scenario } from "../types/scenario";
import type { SchemaTable } from "../types/schema";
import { formatQuery } from "../utils/formatQuery";
import { shortcodeFromPrompt } from "../utils/shortcode";
import Badge, { difficultyLabel, difficultyVariant } from "./Badge";
import Editor from "./Editor";

interface EditorPanelProps {
    value: string;
    onChange: (value: string) => void;
    schema?: SchemaTable[];
    onResult: (result: QueryResult) => void;
    onError: (error: string) => void;
    scenario: Scenario | null;
    onSkip: () => void;
    passed: boolean | null;
    passedIds: string[];
    revealed: boolean;
    onReveal: () => void;
}

export default function EditorPanel({
    value,
    onChange,
    schema,
    onResult,
    onError,
    scenario,
    onSkip,
    passed,
    passedIds,
    revealed,
    onReveal,
}: EditorPanelProps) {
    const { query, status, engineId } = useDb();

    const isPassed = scenario
        ? passed === true || passedIds.includes(scenario.id)
        : false;

    function handleFormat() {
        try {
            onChange(formatQuery(value, engineId));
        } catch {
            // unparseable — leave as-is
        }
    }

    async function handleRun() {
        try {
            const result = await query(value);
            onResult(result);
        } catch (e) {
            onError(String(e));
        }
    }

    return (
        <Tooltip.Provider delayDuration={400}>
            <div className="h-full w-full flex flex-col">
                <div className="border-b border-zinc-300 flex items-start gap-3 p-3">
                    {scenario && (
                        <div className="flex-1 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <Badge variant="shortcode">
                                    {shortcodeFromPrompt(scenario.prompt)}
                                </Badge>
                                <Badge variant={difficultyVariant(scenario.difficulty)}>
                                    {difficultyLabel(scenario.difficulty)}
                                </Badge>
                                {scenario.concepts.map((c) => (
                                    <Badge key={c} variant="concept">{c}</Badge>
                                ))}
                                {isPassed && (
                                    <Badge variant="passed" icon={<CheckIcon size={11} />}>
                                        Passed
                                    </Badge>
                                )}
                                {revealed && !isPassed && (
                                    <Badge variant="revealed" icon={<EyeIcon size={11} />}>
                                        Revealed
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-zinc-600">
                                {scenario.prompt}
                            </p>
                        </div>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <button
                                    onClick={handleFormat}
                                    className="bg-zinc-100 hover:bg-zinc-50 active:translate-y-px active:shadow-none flex items-center justify-center text-zinc-500 h-8 w-8 rounded cursor-pointer shadow-[0_3px_0_0_#d4d4d8] transition-[box-shadow,transform] duration-75"
                                >
                                    <WandSparklesIcon size={14} />
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content
                                    side="bottom"
                                    sideOffset={6}
                                    className="bg-zinc-900 text-zinc-400 text-xs px-2 py-1 rounded shadow-lg data-[state=delayed-open]:animate-fade-in"
                                >
                                    Format (ctrl+shift+f)
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                        {scenario && passed !== true && (
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button
                                        onClick={onSkip}
                                        className="bg-zinc-100 hover:bg-zinc-50 active:translate-y-px active:shadow-none flex items-center justify-center text-zinc-500 h-8 w-8 rounded cursor-pointer shadow-[0_3px_0_0_#d4d4d8] transition-[box-shadow,transform] duration-75"
                                    >
                                        <RefreshCwIcon size={14} />
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        side="bottom"
                                        sideOffset={6}
                                        className="bg-zinc-900 text-zinc-400 text-xs px-2 py-1 rounded shadow-lg data-[state=delayed-open]:animate-fade-in"
                                    >
                                        Skip
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        )}
                        {passed === true ? (
                            <button
                                onClick={onSkip}
                                className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-400 active:translate-y-px active:shadow-none text-white text-sm font-medium px-3 py-1.5 rounded cursor-pointer shadow-[0_3px_0_0_#7c3aed] transition-[box-shadow,transform] duration-75"
                            >
                                Next
                                <StepForwardIcon size={14} />
                            </button>
                        ) : (
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button
                                        onClick={handleRun}
                                        disabled={status !== "ready"}
                                        className="flex items-center gap-1.5 bg-green-400 hover:bg-green-300 active:translate-y-px active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed text-zinc-900 text-sm font-medium px-3 py-1.5 rounded cursor-pointer shadow-[0_3px_0_0_#16a34a] transition-[box-shadow,transform] duration-75"
                                    >
                                        <PlayIcon size={14} />
                                        Run
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        side="bottom"
                                        sideOffset={6}
                                        className="bg-zinc-900 text-zinc-400 text-xs px-2 py-1 rounded shadow-lg data-[state=delayed-open]:animate-fade-in"
                                    >
                                        ctrl+enter
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        )}
                        {scenario &&
                            passed !== true &&
                            !revealed &&
                            !passedIds.includes(scenario.id) && (
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <button
                                            onClick={onReveal}
                                            className="bg-zinc-100 hover:bg-zinc-50 active:translate-y-px active:shadow-none flex items-center justify-center text-amber-500 h-8 w-8 rounded cursor-pointer shadow-[0_3px_0_0_#d4d4d8] transition-[box-shadow,transform] duration-75"
                                        >
                                            <EyeIcon size={14} />
                                        </button>
                                    </Tooltip.Trigger>
                                    <Tooltip.Portal>
                                        <Tooltip.Content
                                            side="bottom"
                                            sideOffset={6}
                                            className="bg-zinc-900 text-zinc-400 text-xs px-2 py-1 rounded shadow-lg data-[state=delayed-open]:animate-fade-in"
                                        >
                                            Show answer
                                        </Tooltip.Content>
                                    </Tooltip.Portal>
                                </Tooltip.Root>
                            )}
                    </div>
                </div>
                <Editor
                    value={value}
                    onChange={onChange}
                    onRun={handleRun}
                    schema={schema}
                    engineId={engineId}
                />
            </div>
        </Tooltip.Provider>
    );
}

import { CheckIcon, EyeIcon } from "lucide-react";
import type { Scenario } from "../types/scenario";
import { shortcodeFromPrompt } from "../utils/shortcode";

interface HistoryViewProps {
    scenarios: Scenario[];
    passedIds: string[];
    revealedIds: string[];
    onJump: (scenario: Scenario) => void;
}

export default function HistoryView({ scenarios, passedIds, revealedIds, onJump }: HistoryViewProps) {
    return (
        <div className="flex-1 flex overflow-hidden dot-grid">
            <div className="flex-1 border-r border-zinc-200" />
            <div className="w-[1200px] shrink-0 bg-white border-x border-zinc-200 overflow-y-auto">
                <ul>
                    {scenarios.map(s => {
                        const passed = passedIds.includes(s.id);
                        const revealed = !passed && revealedIds.includes(s.id);
                        return (
                            <li
                                key={s.id}
                                onClick={() => onJump(s)}
                                className={`flex items-center gap-3 px-8 py-3 border-b-2 border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors ${passed ? "" : "bg-zinc-50 hover:bg-zinc-100"}`}
                            >
                                <span className="font-mono text-xs text-zinc-400 shrink-0">{shortcodeFromPrompt(s.prompt)}</span>
                                <span className="text-sm flex-1 text-zinc-700">{s.prompt}</span>
                                {passed && <CheckIcon size={14} className="text-green-500 shrink-0" />}
                                {revealed && <EyeIcon size={14} className="text-amber-400 shrink-0" />}
                                <div className="flex items-center gap-1 flex-wrap justify-end">
                                    {s.concepts.map(c => (
                                        <span key={c} className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-400">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex-1 border-l border-zinc-200" />
        </div>
    );
}

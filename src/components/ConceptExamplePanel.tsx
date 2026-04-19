import { XIcon } from "lucide-react";
import { CONCEPTS } from "../types/concepts";
import type { ConceptId } from "../types/concepts";
import { CONCEPT_EXAMPLES } from "../lib/conceptExamples";
import Editor from "./Editor";

interface ConceptExamplePanelProps {
    conceptId: ConceptId;
    onClose: () => void;
}

export default function ConceptExamplePanel({ conceptId, onClose }: ConceptExamplePanelProps) {
    const concept = CONCEPTS.find((c) => c.id === conceptId);
    const example = CONCEPT_EXAMPLES[conceptId];

    if (!concept || !example) return null;

    return (
        <div className="h-full flex flex-col bg-zinc-50 border-t border-zinc-200">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-200 shrink-0">
                <span className="text-xs text-zinc-400 uppercase tracking-wide font-medium">
                    {concept.category}
                </span>
                <span className="text-zinc-300">/</span>
                <span className="text-xs font-medium text-zinc-600">{concept.label}</span>
                <button
                    onClick={onClose}
                    className="ml-auto text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    aria-label="Close concept panel"
                >
                    <XIcon size={14} />
                </button>
            </div>
            <p className="text-xs text-zinc-500 px-3 pt-2 pb-1 shrink-0">{example.description}</p>
            <div className="flex-1 min-h-0">
                <Editor
                    value={example.sql}
                    engineId="sqlite"
                    readonly
                />
            </div>
        </div>
    );
}

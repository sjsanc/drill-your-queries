import { Group, Panel, Separator } from "react-resizable-panels";
import type { QueryResult } from "../types/engine";
import { detailedComparison, type DetailedComparison } from "../utils/compareResults";

interface OutputPanelProps {
    result: QueryResult | null;
    error: string | null;
    expectedResult: QueryResult | null;
    passed: boolean | null;
}

function ResultTable({ result, comparison }: { result: QueryResult; comparison?: DetailedComparison }) {
    if (result.rows.length === 0) {
        return <p className="text-xs text-zinc-400 p-3">Query returned no rows.</p>;
    }

    return (
        <div className="overflow-auto h-full">
            <table className="w-full text-xs border-collapse">
                <thead className="sticky top-0 bg-zinc-50 z-10">
                    <tr>
                        {result.columns.map((col) => {
                            const bad = comparison && comparison.columnMatch[col] === false;
                            return (
                                <th
                                    key={col}
                                    className={`text-left px-3 py-2 font-semibold border-b whitespace-nowrap ${
                                        bad ? "text-red-500 border-red-200 bg-red-50" : "text-zinc-600 border-zinc-200"
                                    }`}
                                >
                                    {col}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {result.rows.map((row, i) => {
                        const match = comparison?.rowResults[i];
                        const rowClass = comparison == null
                            ? "odd:bg-white even:bg-zinc-50 hover:bg-blue-50"
                            : match
                                ? "bg-green-50 hover:bg-green-100"
                                : "bg-red-50 hover:bg-red-100";
                        const cellBorder = comparison == null
                            ? "border-zinc-100"
                            : match ? "border-green-200" : "border-red-200";
                        return (
                            <tr key={i} className={rowClass}>
                                {result.columns.map((col) => (
                                    <td
                                        key={col}
                                        className={`px-3 py-1.5 text-zinc-700 border-b whitespace-nowrap ${cellBorder}`}
                                    >
                                        {row[col] === null || row[col] === undefined
                                            ? <span className="text-zinc-300 italic">null</span>
                                            : String(row[col])}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-3 py-1.5 border-b border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
            {children}
        </div>
    );
}

export default function OutputPanel({ result, error, expectedResult, passed }: OutputPanelProps) {
    const comparison = result && expectedResult && passed !== null
        ? detailedComparison(expectedResult, result)
        : undefined;

    return (
        <Group orientation="vertical" className="h-full">
            <Panel defaultSize={60} minSize={20} className="border-b border-zinc-200 flex flex-col overflow-hidden">
                {passed === true && (
                    <div className="px-3 py-2 text-xs font-semibold border-b bg-green-50 text-green-700 border-green-200">
                        Correct
                    </div>
                )}
                <PanelLabel>Your result</PanelLabel>
                <div className="flex-1 overflow-auto dot-grid">
                    {error && <div className="p-3 text-xs text-red-500 font-mono bg-white">{error}</div>}
                    {result && !error && <ResultTable result={result} comparison={comparison} />}
                    {!result && !error && (
                        <div className="h-full flex items-center justify-center text-xs text-zinc-300">
                            Run your query
                        </div>
                    )}
                </div>
            </Panel>
            <Separator className="h-1 bg-zinc-200 hover:bg-purple-400 transition-colors cursor-row-resize" />
            <Panel defaultSize={40} minSize={10} className="flex flex-col overflow-hidden">
                <PanelLabel>Target</PanelLabel>
                <div className="flex-1 overflow-auto dot-grid">
                    {expectedResult
                        ? <ResultTable result={expectedResult} />
                        : <div className="h-full flex items-center justify-center text-xs text-zinc-300">No scenario active</div>
                    }
                </div>
            </Panel>
        </Group>
    );
}

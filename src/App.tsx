import { DumbbellIcon, TimerIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Group, Panel, Separator, useDefaultLayout } from "react-resizable-panels";
import ConceptSelect from "./components/ConceptSelect";
import EditorPanel from "./components/EditorPanel";
import EngineSelect from "./components/EngineSelect";
import HistoryView from "./components/HistoryView";
import OutputPanel from "./components/OutputPanel";
import SchemaSelect from "./components/SchemaSelect";
import SchemaSidebar from "./components/SchemaSidebar";
import { DbProvider, useDb } from "./context/DbContext";
import type { ConceptId } from "./types/concepts";
import type { QueryResult } from "./types/engine";
import type { Scenario } from "./types/scenario";
import { STORAGE_KEYS } from "./utils/storageKeys";
import { ecommerceSchema } from "./schemas";
import { compareResults } from "./utils/compareResults";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { pickRandom } from "./utils/scenarioSelection";
import { formatQuery } from "./utils/formatQuery";
import { shortcodeFromPrompt } from "./utils/shortcode";

function LoadingOverlay({ engineId }: { engineId: string }) {
    return (
        <div className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-zinc-400">Loading <span className="text-purple-400">{engineId}</span>...</p>
        </div>
    );
}

function Shell() {
    const { engineId, schemaDef, schema, status, query } = useDb();
    const [queryText, setQueryText] = useState("");
    const [result, setResult] = useState<QueryResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [passedIds, setPassedIds] = useLocalStorage<string[]>(STORAGE_KEYS.passedScenarios, []);
    const [, setSkippedCounts] = useLocalStorage<Record<string, number>>(STORAGE_KEYS.skippedScenarios, {});
    const [selectedConcepts, setSelectedConcepts] = useLocalStorage<ConceptId[]>(STORAGE_KEYS.selectedConcepts, []);
    const [revealedIds, setRevealedIds] = useLocalStorage<string[]>(STORAGE_KEYS.revealedScenarios, []);
    const [revealed, setRevealed] = useState(false);
    const [currentScenarioId, setCurrentScenarioId] = useLocalStorage<string | null>(STORAGE_KEYS.currentScenarioId, null);
    const [currentView, setCurrentView] = useLocalStorage<"drill" | "history">(STORAGE_KEYS.currentView, "drill");
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [expectedResult, setExpectedResult] = useState<QueryResult | null>(null);
    const [passed, setPassed] = useState<boolean | null>(null);

    const allScenarios = schemaDef?.scenarios ?? [];

    const scenarioPool = useMemo(() => {
        if (selectedConcepts.length === 0) return allScenarios;
        const filtered = allScenarios.filter(s => s.concepts.some(c => selectedConcepts.includes(c)));
        return filtered.length > 0 ? filtered : allScenarios;
    }, [allScenarios, selectedConcepts]);

    // Restore scenario on initial load — URL param takes priority over localStorage
    useEffect(() => {
        if (!allScenarios.length) return;
        const urlCode = new URLSearchParams(location.search).get("s");
        const fromUrl = urlCode ? allScenarios.find(s => shortcodeFromPrompt(s.prompt) === urlCode) : null;
        const fromStorage = currentScenarioId ? allScenarios.find(s => s.id === currentScenarioId) : null;
        setScenario(fromUrl ?? fromStorage ?? pickRandom(allScenarios, null, passedIds));
    }, [allScenarios]);

    useEffect(() => {
        if (!scenario) return;
        history.replaceState(null, "", "?s=" + shortcodeFromPrompt(scenario.prompt));
    }, [scenario]);

    useEffect(() => {
        if (!allScenarios.length) return;
        setScenario(pickRandom(scenarioPool, null, passedIds));
    }, [schemaDef?.id]);

    useEffect(() => {
        if (scenario) setCurrentScenarioId(scenario.id);
    }, [scenario?.id]);

    useEffect(() => {
        setResult(null);
        setError(null);
        setPassed(null);
        setRevealed(false);
        if (!scenario || status !== "ready") { setExpectedResult(null); return; }
        query(scenario.expectedSql)
            .then(setExpectedResult)
            .catch(() => setExpectedResult(null));
    }, [scenario, status]);

    useEffect(() => {
        if (passed === true && !revealed && scenario && !passedIds.includes(scenario.id)) {
            setPassedIds(prev => [...prev, scenario.id]);
        }
    }, [passed]);

    const panelLayout = useDefaultLayout({
        id: STORAGE_KEYS.panelLayout,
        storage: localStorage,
    });

    useEffect(() => {
        setQueryText("");
        setResult(null);
        setError(null);
        setRevealed(false);
    }, [engineId, schemaDef?.id]);

    function handleResult(r: QueryResult) {
        setResult(r);
        setError(null);
        setPassed(expectedResult ? compareResults(expectedResult, r) : null);
    }

    function handleError(e: string) {
        setError(e);
        setResult(null);
        setPassed(null);
    }

    function handleReveal() {
        if (!scenario) return;
        setRevealed(true);
        let sql = scenario.expectedSql;
        try { sql = formatQuery(sql, engineId); } catch { /* leave as-is */ }
        setQueryText(sql);
        if (!revealedIds.includes(scenario.id)) {
            setRevealedIds(prev => [...prev, scenario.id]);
        }
    }

    function handleSkip() {
        if (scenario && passed !== true) {
            setSkippedCounts(prev => ({
                ...prev,
                [scenario.id]: (prev[scenario.id] ?? 0) + 1,
            }));
        }
        setQueryText("");
        setScenario(s => pickRandom(scenarioPool, s, passedIds));
    }

    function handleJump(target: Scenario) {
        setQueryText("");
        setScenario(target);
        setCurrentView("drill");
    }

    return (
        <div className="h-screen w-screen flex flex-col relative">
            {status === "initialising" && <LoadingOverlay engineId={engineId} />}
            <div className="relative h-12 bg-zinc-900 text-purple-500 flex items-center px-3 gap-3">
                <div className="grain-bar">
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}>DYQ</span>
                </div>
                <h1 className="flex-1 text-white text-sm font-medium pl-[50px]">Drill Your Queries</h1>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
                    <button
                        onClick={() => setCurrentView("drill")}
                        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded cursor-pointer ${currentView === "drill" ? "text-white bg-zinc-700" : "text-zinc-500 hover:bg-zinc-800"}`}
                    >
                        <DumbbellIcon size={13} />
                        Drill
                    </button>
                    <button
                        onClick={() => setCurrentView("history")}
                        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded cursor-pointer ${currentView === "history" ? "text-white bg-zinc-700" : "text-zinc-500 hover:bg-zinc-800"}`}
                    >
                        <TimerIcon size={13} />
                        History
                    </button>
                </div>
                <ConceptSelect
                    selected={selectedConcepts}
                    onChange={setSelectedConcepts}
                />
                <SchemaSelect />
                <EngineSelect />
            </div>
            <div className="flex-1 flex w-full overflow-hidden">
                {currentView === "drill" && (
                    <div className="w-[220px] shrink-0 border-r border-zinc-300">
                        <SchemaSidebar engine={engineId} schema={schema} />
                    </div>
                )}
                {currentView === "drill" ? (
                    <Group orientation="horizontal" className="flex-1" {...panelLayout}>
                        <Panel defaultSize={50} minSize={20}>
                            <EditorPanel
                                value={queryText}
                                onChange={setQueryText}
                                schema={schema}
                                onResult={handleResult}
                                onError={handleError}
                                scenario={scenario}
                                onSkip={handleSkip}
                                passed={passed}
                                passedIds={passedIds}
                                revealed={revealed}
                                onReveal={handleReveal}
                            />
                        </Panel>
                        <Separator className="w-1 bg-zinc-200 hover:bg-purple-400 transition-colors cursor-col-resize" />
                        <Panel defaultSize={50} minSize={20}>
                            <OutputPanel
                                result={result}
                                error={error}
                                expectedResult={expectedResult}
                                passed={passed}
                            />
                        </Panel>
                    </Group>
                ) : (
                    <HistoryView
                        scenarios={allScenarios}
                        passedIds={passedIds}
                        revealedIds={revealedIds}
                        onJump={handleJump}
                    />
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <DbProvider initialEngineId="sqlite" initialSchema={ecommerceSchema}>
            <Shell />
        </DbProvider>
    );
}

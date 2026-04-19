import { DumbbellIcon, TimerIcon } from "lucide-react";
import {
    Group,
    Panel,
    Separator,
    useDefaultLayout,
} from "react-resizable-panels";
import ConceptSelect from "./components/ConceptSelect";
import EditorPanel from "./components/EditorPanel";
import EngineSelect from "./components/EngineSelect";
import HistoryView from "./components/HistoryView";
import OutputPanel from "./components/OutputPanel";
import SchemaSelect from "./components/SchemaSelect";
import SchemaSidebar from "./components/SchemaSidebar";
import { DbProvider, useDb } from "./db/DbContext";
import { useScenario } from "./hooks/useScenario";
import { ecommerceSchema } from "./data";
import type { EngineId } from "./types/engine";
import { STORAGE_KEYS } from "./utils/storageKeys";

function LoadingOverlay({ engineId }: { engineId: string }) {
    return (
        <div className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-zinc-400">
                Loading <span className="text-purple-400">{engineId}</span>...
            </p>
        </div>
    );
}

function Shell() {
    const { engineId, schema, status, schemaDef } = useDb();
    const {
        scenario,
        queryText,
        setQueryText,
        result,
        error,
        expectedResult,
        passed,
        revealed,
        passedIds,
        revealedIds,
        allScenarios,
        selectedConcepts,
        setSelectedConcepts,
        currentView,
        setCurrentView,
        sm2Store,
        handleResult,
        handleError,
        handleReveal,
        handleSkip,
        handleJump,
    } = useScenario();

    const panelLayout = useDefaultLayout({
        id: STORAGE_KEYS.panelLayout,
        storage: localStorage,
    });

    return (
        <div className="h-screen w-screen flex flex-col relative">
            {status === "initialising" && <LoadingOverlay engineId={engineId} />}
            <div className="relative h-12 bg-zinc-900 text-purple-500 flex items-center px-3 gap-3">
                <div className="grain-bar">
                    <span
                        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
                    >
                        DYQ
                    </span>
                </div>
                <h1 className="flex-1 text-white text-sm font-medium pl-[50px]">
                    Drill Your Queries
                </h1>
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
                    engineId={engineId as EngineId}
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
                        sm2Store={sm2Store}
                        schemaId={schemaDef?.id ?? ""}
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

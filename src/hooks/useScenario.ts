import { useEffect, useMemo, useState } from "react";
import { useDb } from "../db/DbContext";
import { useLocalStorage } from "./useLocalStorage";
import { CONCEPTS, type ConceptId } from "../types/concepts";
import type { EngineId, QueryResult } from "../types/engine";
import type { Scenario } from "../types/scenario";
import type { SM2Store } from "../types/spacedRepetition";
import { compareResults } from "../utils/compareResults";
import { filterScenariosForEngine, shortcodeFromPrompt } from "../utils/scenarios";
import { formatQuery } from "../utils/formatQuery";
import { pickWithSR, sm2Key, updateSM2 } from "../utils/spacedRepetition";
import { STORAGE_KEYS } from "../utils/storageKeys";

export function useScenario() {
    const { engineId, schemaDef, status, query } = useDb();

    const [passedIds, setPassedIds] = useLocalStorage<string[]>(STORAGE_KEYS.passedScenarios, []);
    const [, setSkippedCounts] = useLocalStorage<Record<string, number>>(STORAGE_KEYS.skippedScenarios, {});
    const [selectedConcepts, setSelectedConcepts] = useLocalStorage<ConceptId[]>(STORAGE_KEYS.selectedConcepts, []);
    const [revealedIds, setRevealedIds] = useLocalStorage<string[]>(STORAGE_KEYS.revealedScenarios, []);
    const [sm2Store, setSm2Store] = useLocalStorage<SM2Store>(STORAGE_KEYS.sm2Store, {});
    const [currentScenarioId, setCurrentScenarioId] = useLocalStorage<string | null>(STORAGE_KEYS.currentScenarioId, null);
    const [currentView, setCurrentView] = useLocalStorage<"drill" | "history">(STORAGE_KEYS.currentView, "drill");

    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [queryText, setQueryText] = useState("");
    const [result, setResult] = useState<QueryResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [expectedResult, setExpectedResult] = useState<QueryResult | null>(null);
    const [passed, setPassed] = useState<boolean | null>(null);
    const [revealed, setRevealed] = useState(false);

    const scenarioKey = (s: Scenario) => shortcodeFromPrompt(s.prompt);

    const allScenarios = useMemo(
        () => filterScenariosForEngine(schemaDef?.scenarios ?? [], engineId as EngineId),
        [schemaDef?.scenarios, engineId],
    );

    const validConceptIds = useMemo(() => {
        const id = engineId as EngineId;
        return new Set(
            CONCEPTS.filter((c) => c.engine === "generic" || c.engine === id).map((c) => c.id),
        );
    }, [engineId]);

    const scenarioPool = useMemo(() => {
        const active = selectedConcepts.filter((c) => validConceptIds.has(c));
        if (active.length === 0) return allScenarios;
        const filtered = allScenarios.filter((s) => s.concepts.some((c) => active.includes(c)));
        return filtered.length > 0 ? filtered : allScenarios;
    }, [allScenarios, selectedConcepts, validConceptIds]);

    // Restore scenario on initial load — URL param takes priority over localStorage
    useEffect(() => {
        if (!allScenarios.length) return;
        const urlCode = new URLSearchParams(location.search).get("s");
        const fromUrl = urlCode ? allScenarios.find((s) => shortcodeFromPrompt(s.prompt) === urlCode) : null;
        const fromStorage = currentScenarioId ? allScenarios.find((s) => scenarioKey(s) === currentScenarioId) : null;
        setScenario(fromUrl ?? fromStorage ?? pickWithSR(allScenarios, null, sm2Store, schemaDef?.id ?? ""));
    }, [allScenarios]);

    useEffect(() => {
        if (!scenario) return;
        history.replaceState(null, "", `?s=${shortcodeFromPrompt(scenario.prompt)}`);
    }, [scenario]);

    useEffect(() => {
        if (!allScenarios.length) return;
        setScenario(pickWithSR(scenarioPool, null, sm2Store, schemaDef?.id ?? ""));
    }, [schemaDef?.id]);

    useEffect(() => {
        if (scenario) setCurrentScenarioId(scenarioKey(scenario));
    }, [scenario?.prompt]);

    useEffect(() => {
        setResult(null);
        setError(null);
        setPassed(null);
        setRevealed(false);
        if (!scenario || status !== "ready") {
            setExpectedResult(null);
            return;
        }
        query(scenario.expectedSql)
            .then(setExpectedResult)
            .catch(() => setExpectedResult(null));
    }, [scenario, status]);

    useEffect(() => {
        if (passed === true && !revealed && scenario) {
            if (!passedIds.includes(scenarioKey(scenario))) {
                setPassedIds((prev) => [...prev, scenarioKey(scenario)]);
            }
            const key = sm2Key(schemaDef?.id ?? "", scenarioKey(scenario));
            const now = Date.now();
            setSm2Store((prev) => ({ ...prev, [key]: updateSM2(prev[key], 4, now) }));
        }
    }, [passed]);

    useEffect(() => {
        setQueryText("");
        setResult(null);
        setError(null);
        setRevealed(false);
        setSelectedConcepts([]);
        setScenario((current) => {
            if (current?.engines && !(current.engines as string[]).includes(engineId)) {
                return pickWithSR(allScenarios, null, sm2Store, schemaDef?.id ?? "");
            }
            return current;
        });
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
        if (!revealedIds.includes(scenarioKey(scenario))) {
            setRevealedIds((prev) => [...prev, scenarioKey(scenario)]);
        }
        const key = sm2Key(schemaDef?.id ?? "", scenarioKey(scenario));
        const now = Date.now();
        setSm2Store((prev) => ({ ...prev, [key]: updateSM2(prev[key], 1, now) }));
    }

    function handleSkip() {
        if (scenario && passed !== true) {
            setSkippedCounts((prev) => ({
                ...prev,
                [scenarioKey(scenario)]: (prev[scenarioKey(scenario)] ?? 0) + 1,
            }));
        }
        setQueryText("");
        setScenario((s) => pickWithSR(scenarioPool, s, sm2Store, schemaDef?.id ?? ""));
    }

    function handleJump(target: Scenario) {
        setQueryText("");
        setScenario(target);
        setCurrentView("drill");
    }

    return {
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
        scenarioPool,
        validConceptIds,
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
    };
}

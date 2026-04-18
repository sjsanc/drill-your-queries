import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { PostgreSQL, SQLite, sql } from "@codemirror/lang-sql";
import {
    defaultHighlightStyle,
    HighlightStyle,
    indentOnInput,
    syntaxHighlighting,
} from "@codemirror/language";
import { Compartment, EditorState, Prec } from "@codemirror/state";
import {
    drawSelection,
    EditorView,
    highlightActiveLine,
    highlightActiveLineGutter,
    keymap,
    lineNumbers,
    placeholder,
} from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { useEffect, useRef } from "react";
import type { EngineId } from "../types/engine";
import type { SchemaTable } from "../types/schema";
import { formatQuery } from "../utils/formatQuery";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    onRun?: () => void;
    schema?: SchemaTable[];
    engineId?: EngineId;
}

const sqlHighlight = HighlightStyle.define([
    { tag: tags.keyword, fontWeight: "bold" },
    { tag: tags.typeName, fontWeight: "bold" },
]);

const baseTheme = EditorView.theme({
    "&": { height: "100%" },
    ".cm-scroller": {
        overflow: "auto",
        fontFamily: "monospace",
        fontSize: "15px",
    },
});

function getDialect(engineId: EngineId) {
    if (engineId === "sqlite") return SQLite;
    return PostgreSQL;
}

function buildSqlSchema(schema: SchemaTable[]): Record<string, string[]> {
    return Object.fromEntries(
        schema.map((t) => [t.name, t.columns.map((c) => c.name)]),
    );
}

export default function Editor({
    value,
    onChange,
    onRun,
    schema = [],
    engineId = "sqlite",
}: EditorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onRunRef = useRef(onRun);
    const engineIdRef = useRef(engineId);
    onRunRef.current = onRun;
    engineIdRef.current = engineId;

    const sqlCompartment = useRef(new Compartment());

    useEffect(() => {
        if (!containerRef.current) return;

        const view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    lineNumbers(),
                    highlightActiveLineGutter(),
                    highlightActiveLine(),
                    drawSelection(),
                    indentOnInput(),
                    closeBrackets(),
                    syntaxHighlighting(defaultHighlightStyle),
                    syntaxHighlighting(sqlHighlight),
                    sqlCompartment.current.of(
                        sql({
                            dialect: getDialect(engineId),
                            schema: buildSqlSchema(schema),
                            upperCaseKeywords: true,
                        }),
                    ),
                    autocompletion(),
                    placeholder("Write your query here..."),
                    Prec.highest(
                        keymap.of([
                            {
                                key: "Ctrl-Enter",
                                run: () => {
                                    onRunRef.current?.();
                                    return true;
                                },
                            },
                            {
                                key: "Ctrl-Shift-f",
                                run: (v) => {
                                    try {
                                        const formatted = formatQuery(
                                            v.state.doc.toString(),
                                            engineIdRef.current,
                                        );
                                        v.dispatch({
                                            changes: {
                                                from: 0,
                                                to: v.state.doc.length,
                                                insert: formatted,
                                            },
                                        });
                                    } catch {
                                        // unparseable — leave as-is
                                    }
                                    return true;
                                },
                            },
                        ]),
                    ),
                    baseTheme,
                    EditorView.updateListener.of((update) => {
                        if (update.docChanged)
                            onChange(update.state.doc.toString());
                    }),
                ],
            }),
            parent: containerRef.current,
        });

        viewRef.current = view;
        return () => view.destroy();
    }, []);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch({
            effects: sqlCompartment.current.reconfigure(
                sql({
                    dialect: getDialect(engineId),
                    schema: buildSqlSchema(schema),
                    upperCaseKeywords: true,
                }),
            ),
        });
    }, [engineId, schema]);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;
        const current = view.state.doc.toString();
        if (current !== value) {
            view.dispatch({
                changes: { from: 0, to: current.length, insert: value },
            });
        }
    }, [value]);

    return <div ref={containerRef} className="flex-1 w-full" />;
}

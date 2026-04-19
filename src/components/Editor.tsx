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
    onChange?: (value: string) => void;
    onRun?: (sql: string) => void;
    schema?: SchemaTable[];
    engineId?: EngineId;
    readonly?: boolean;
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
    readonly = false,
}: EditorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onRunRef = useRef(onRun);
    const onChangeRef = useRef(onChange);
    const engineIdRef = useRef(engineId);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    onRunRef.current = onRun;
    onChangeRef.current = onChange;
    engineIdRef.current = engineId;

    const sqlCompartment = useRef(new Compartment());

    useEffect(() => {
        if (!containerRef.current) return;

        const interactiveExtensions = readonly
            ? [EditorState.readOnly.of(true)]
            : [
                  highlightActiveLineGutter(),
                  highlightActiveLine(),
                  drawSelection(),
                  indentOnInput(),
                  closeBrackets(),
                  autocompletion(),
                  placeholder("Write your query here..."),
                  Prec.highest(
                      keymap.of([
                          {
                              key: "Tab",
                              run: (v) => {
                                  v.dispatch(v.state.replaceSelection("\t"));
                                  return true;
                              },
                          },
                          {
                              key: "Ctrl-Enter",
                              run: (v) => {
                                  onRunRef.current?.(v.state.doc.toString());
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
                  EditorView.updateListener.of((update) => {
                      if (update.docChanged) {
                          const doc = update.state.doc.toString();
                          clearTimeout(debounceRef.current);
                          debounceRef.current = setTimeout(() => {
                              onChangeRef.current?.(doc);
                          }, 100);
                      }
                  }),
              ];

        const view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    lineNumbers(),
                    syntaxHighlighting(defaultHighlightStyle),
                    syntaxHighlighting(sqlHighlight),
                    sqlCompartment.current.of(
                        sql({
                            dialect: getDialect(engineId),
                            schema: buildSqlSchema(schema),
                            upperCaseKeywords: true,
                        }),
                    ),
                    baseTheme,
                    ...interactiveExtensions,
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

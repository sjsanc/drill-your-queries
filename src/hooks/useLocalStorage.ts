import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? (JSON.parse(item) as T) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    const set = useCallback(
        (next: T | ((prev: T) => T)) => {
            setValue((prev) => {
                const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
                try {
                    localStorage.setItem(key, JSON.stringify(resolved));
                } catch {}
                return resolved;
            });
        },
        [key]
    );

    return [value, set] as const;
}

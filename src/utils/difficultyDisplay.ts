import type { Scenario } from "../types/scenario";

export function difficultyClass(difficulty: Scenario["difficulty"]): string {
    if (difficulty === 1) return "bg-green-100 text-green-700";
    if (difficulty === 2) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
}

export function difficultyLabel(difficulty: Scenario["difficulty"]): string {
    if (difficulty === 1) return "Easy";
    if (difficulty === 2) return "Medium";
    return "Hard";
}

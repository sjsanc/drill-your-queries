export function shortcodeFromPrompt(prompt: string): string {
    let h = 5381;
    for (let i = 0; i < prompt.length; i++) {
        h = (Math.imul(h, 33) ^ prompt.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(36).slice(0, 6).padStart(6, "0");
}

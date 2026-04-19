export interface SM2Record {
    interval: number;
    easeFactor: number;
    repetitions: number;
    dueAt: number;
    lastAttemptAt: number;
}

export type SM2Grade = 0 | 1 | 2 | 3 | 4 | 5;

export type SM2Store = Record<string, SM2Record>;

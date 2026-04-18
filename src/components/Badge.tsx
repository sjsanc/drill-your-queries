import type { ReactNode } from "react";

const VARIANTS = {
    shortcode: "font-mono bg-zinc-800 text-zinc-300",
    concept:   "bg-zinc-100 text-zinc-400",
    passed:    "font-medium bg-green-100 text-green-700",
    revealed:  "font-medium bg-amber-100 text-amber-700",
} as const;

type BadgeVariant = keyof typeof VARIANTS;

interface BadgeProps {
    variant: BadgeVariant;
    icon?: ReactNode;
    children: ReactNode;
}

export default function Badge({ variant, icon, children }: BadgeProps) {
    return (
        <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded ${VARIANTS[variant]}`}>
            {icon}
            {children}
        </span>
    );
}

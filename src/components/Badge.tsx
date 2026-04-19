import type { ReactNode } from "react";

const VARIANTS = {
    shortcode:        "font-mono bg-zinc-800 text-zinc-300",
    concept:          "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 transition-colors duration-75",
    "active-concept": "bg-purple-100 text-purple-600",
    passed:           "font-medium bg-green-100 text-green-700",
    revealed:         "font-medium bg-amber-100 text-amber-700",
} as const;

type BadgeVariant = keyof typeof VARIANTS;

interface BadgeProps {
    variant: BadgeVariant;
    icon?: ReactNode;
    children: ReactNode;
    onClick?: () => void;
}

export default function Badge({ variant, icon, children, onClick }: BadgeProps) {
    const base = `inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded ${VARIANTS[variant]}`;
    if (onClick) {
        return (
            <button onClick={onClick} className={`${base} cursor-pointer`}>
                {icon}
                {children}
            </button>
        );
    }
    return (
        <span className={base}>
            {icon}
            {children}
        </span>
    );
}

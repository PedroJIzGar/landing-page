import type { LucideIcon } from "lucide-react";

export type Tech = { name: string; icon: LucideIcon };
export type Project = {
    title: string;
    description: string;
    tags: string[];
    github: string;
    demo: string;
    image: string;
};
export type Experience = {
    role: string;
    company: string;
    period: string;
    bullets: string[];
};

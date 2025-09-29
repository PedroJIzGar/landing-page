import type { Experience } from "../types";

/**
 * Historial de experiencia mostrado en la sección “Experiencia”.
 *
 * @remarks
 * - Cada entrada debe cumplir el tipo {@link Experience}.
 * - El componente de UI admite opcionalmente `location` y `link` (URL de empresa/proyecto).
 * - Usa periodos legibles (p. ej., `"2024 — 2025"` o `"2023 — Actualidad"`).
 *
 * @example
 * ```ts
 * EXPERIENCE[0].role    // => "Front-end Developer (Prácticas)"
 * EXPERIENCE[0].bullets // => string[]
 * ```
 *
 * @public
 */
export const EXPERIENCE: Experience[] = [
    {
        role: "Front-end Developer (Prácticas)",
        company: "Fundación Medac",
        period: "2024 — 2025",
        bullets: [
            "Angular 17 · SPA para feria de empleo virtual.",
            "Integración Firebase y despliegues en Netlify/Vercel.",
            "Refactor a componentes standalone y lazy loading.",
        ],
        // location: "Remoto · Murcia, ES",
        // link: "https://www.fundacionmedac.es/",
    },
    {
        role: "Full Stack Personal Projects",
        company: "Proyectos propios",
        period: "2023 — Actualidad",
        bullets: [
            "Diseño de APIs REST con Spring Boot / Node.",
            "Patrones: DTO/Mapper, servicios, repositorios, tests.",
            "PostgreSQL, Docker y CI/CD básico.",
        ],
        // link: "https://tusitio.dev/proyectos",
    },
];

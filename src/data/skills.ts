/**
 * Conjunto de habilidades agrupadas por categoría.
 *
 * @remarks
 * - Consumido por la sección `Skills`, que renderiza 4 buckets (2×2).
 * - Mantén los nombres cortos y consistentes para que quepan bien en los `Badge`.
 * - Se exporta `as const` para conservar literales y ayudar al auto-completado.
 *
 * @example
 * ```ts
 * SKILLS_BY.frontend.includes("React"); // true
 * ```
 *
 * @public
 */
export const SKILLS_BY = {
  frontend: ["React", "Angular", "TypeScript", "Tailwind", "Figma", "Accesibilidad"],
  backend: ["Java", "Spring Boot", "JPA", "MapStruct", "Node.js", "Express", "Prisma"],
  dataops: ["PostgreSQL", "MySQL", "Docker"],
  testing: ["JUnit", "Jest", "Vitest", "Cypress"],
} as const;

/**
 * Tipo utilitario con la forma exacta de `SKILLS_BY`,
 * útil si quieres tipar funciones/helpers que operen sobre estos buckets.
 *
 * @public
 */
export type SkillsBy = typeof SKILLS_BY;

/**
 * Unión de claves de bucket (e.g., `"frontend" | "backend" | "dataops" | "testing"`).
 *
 * @public
 */
export type SkillBucketKey = keyof SkillsBy;

/**
 * Unión literal de todas las skills declaradas.
 * (Derivada de los arrays marcados `as const`.)
 *
 * @public
 */
export type SkillName =
  SkillsBy[keyof SkillsBy][number];

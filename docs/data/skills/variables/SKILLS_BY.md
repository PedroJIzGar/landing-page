[**mi-portfolio**](../../../README.md)

***

> `const` **SKILLS\_BY**: `object`

Defined in: data/skills.ts:16

Conjunto de habilidades agrupadas por categoría.

## Type Declaration

### backend

> `readonly` **backend**: readonly \[`"Java"`, `"Spring Boot"`, `"JPA"`, `"MapStruct"`, `"Node.js"`, `"Express"`, `"Prisma"`\]

### dataops

> `readonly` **dataops**: readonly \[`"PostgreSQL"`, `"MySQL"`, `"Docker"`\]

### frontend

> `readonly` **frontend**: readonly \[`"React"`, `"Angular"`, `"TypeScript"`, `"Tailwind"`, `"Figma"`, `"Accesibilidad"`\]

### testing

> `readonly` **testing**: readonly \[`"JUnit"`, `"Jest"`, `"Vitest"`, `"Cypress"`\]

## Remarks

- Consumido por la sección `Skills`, que renderiza 4 buckets (2×2).
- Mantén los nombres cortos y consistentes para que quepan bien en los `Badge`.
- Se exporta `as const` para conservar literales y ayudar al auto-completado.

## Example

```ts
SKILLS_BY.frontend.includes("React"); // true
```

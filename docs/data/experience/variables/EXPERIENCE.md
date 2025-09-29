[**mi-portfolio**](../../../README.md)

***

> `const` **EXPERIENCE**: [`Experience`](../../../types/type-aliases/Experience.md)[]

Defined in: data/experience.ts:19

Historial de experiencia mostrado en la sección “Experiencia”.

## Remarks

- Cada entrada debe cumplir el tipo [Experience](../../../types/type-aliases/Experience.md).
- El componente de UI admite opcionalmente `location` y `link` (URL de empresa/proyecto).
- Usa periodos legibles (p. ej., `"2024 — 2025"` o `"2023 — Actualidad"`).

## Example

```ts
EXPERIENCE[0].role    // => "Front-end Developer (Prácticas)"
EXPERIENCE[0].bullets // => string[]
```

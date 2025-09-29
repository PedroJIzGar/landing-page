[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Skills.tsx:71

Sección “Habilidades” agrupada en 4 buckets (2×2) con chips por tecnología.

## Returns

`Element`

## Remarks

- Orden fijo para simetría: `frontend`, `backend`, `dataops`, `testing`.
- Cada bucket muestra un acento lateral y sus skills en `Badge` con tonos de la paleta.
- Las listas de skills se ordenan alfabéticamente para escaneo rápido.

## Example

```tsx
<Skills />
```

## See

 - [SKILLS\_BY](../../../data/skills/variables/SKILLS_BY.md) fuente de datos por bucket.
 - [Badge](../../ui/Badge/functions/default.md) chip visual para cada tecnología.
 - [Card](../../ui/Card/functions/default.md) contenedor visual por bucket.

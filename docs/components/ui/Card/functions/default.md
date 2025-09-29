[**mi-portfolio**](../../../../README.md)

***

> **default**(`__namedParameters`): `Element`

Defined in: components/ui/Card.tsx:68

Contenedor visual con borde, superficie y blur sutil.

## Parameters

### \_\_namedParameters

`Props`

## Returns

`Element`

## Remarks

- Respeta los tokens de diseño (`--surface`, `--border`, `--ring`).
- Cuando `interactive` es `true`, aplica elevación en hover y anillo de foco
  accesible con `focus-within` para mejorar la UX al navegar con teclado.
- La variante de padding se controla mediante el prop `padding`.

## Examples

Card básico:
```tsx
<Card>
  <h3 className="text-lg font-semibold">Título</h3>
  <p>Contenido del card…</p>
</Card>
```

Card interactivo con padding pequeño:
```tsx
<Card interactive padding="sm">
  <button className="rounded px-3 py-1 focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
    Acción
  </button>
</Card>
```

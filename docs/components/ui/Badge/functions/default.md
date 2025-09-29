[**mi-portfolio**](../../../../README.md)

***

> **default**(`__namedParameters`): `Element`

Defined in: components/ui/Badge.tsx:62

Etiqueta (chip) compacta para mostrar tecnologías, estados o metadatos.

## Parameters

### \_\_namedParameters

#### children

`ReactNode`

#### tone?

`Tone` = `"mint"`

## Returns

`Element`

## Remarks

- Usa esquinas totalmente redondeadas y tipografía compacta (`leading-none`) para ahorrar espacio.
- Mantiene buen contraste con mezclas suaves de la paleta y un borde sutil (`--border`).
- El contenido es libre: texto simple o icono + texto.

## Examples

Render básico:
```tsx
<Badge>React</Badge>
```

Con tono de marca y un icono:
```tsx
<Badge tone="primary">
  <span className="inline-flex items-center gap-1">
    <Star className="h-3.5 w-3.5" aria-hidden="true" /> Destacado
  </span>
</Badge>
```

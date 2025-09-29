[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Experience.tsx:64

Sección de Experiencia con una línea temporal accesible.

## Returns

`Element`

## Remarks

- Usa semántica `<ol>`/`<li>` para representar la progresión temporal.
- Cada hito se renderiza dentro de un `Card` con cabecera (rol/empresa/periodo)
  y una lista de logros con iconos.
- Animaciones de aparición mediante `framer-motion`, con `viewport.once`.
- El borde izquierdo de la línea usa una mezcla de `--primary` y `--border` para
  integrarse con el tema.

## Example

```tsx
<Experience />
```

## See

 - [Section](../../layout/Section/functions/default.md) contenedor semántico de sección.
 - [Card](../../ui/Card/functions/default.md) contenedor visual de cada hito.

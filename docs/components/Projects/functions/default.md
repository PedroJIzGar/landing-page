[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Projects.tsx:170

Sección “Proyectos” con grid responsivo y cards de altura alineada.

## Returns

`Element`

## Remarks

- Reserva alturas mínimas para **título**, **descripción** y **tags** (alineación visual).
- Cada card usa `Card` y `Carousel`; si no hay media, muestra un placeholder.
- Acciones accesibles para **Código** y **Demo** con estados deshabilitados claros.
- Animaciones discretas con `framer-motion` y `viewport.once`.

## Example

```tsx
<Projects />
```

## See

 - [Project](../../../data/projects/type-aliases/Project.md) modelo de datos de un proyecto.
 - [MediaItem](../../../data/projects/type-aliases/MediaItem.md) elementos multimedia soportados por el carrusel.

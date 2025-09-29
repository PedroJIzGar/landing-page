[**mi-portfolio**](../../../../README.md)

***

> **default**(`__namedParameters`): `Element`

Defined in: components/layout/Section.tsx:39

Contenedor de sección con título, subtítulo opcional y animaciones sutiles.

## Parameters

### \_\_namedParameters

`Props`

## Returns

`Element`

## Remarks

- Renderiza una estructura semántica accesible: `<section>` → `<h2>` → contenido.
- Aplica `scroll-mt-28` para que, al navegar por hash, el título no quede oculto bajo el header sticky.
- Usa `framer-motion` para animaciones de aparición con `viewport.once` (se animan solo la primera vez).
- La barra de acento bajo el título utiliza el token `--primary`.

## Example

```tsx
<Section id="projects" title="Proyectos" subtitle="Selección reciente">
  <Projects />
</Section>
```

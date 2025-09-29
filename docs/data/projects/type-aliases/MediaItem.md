[**mi-portfolio**](../../../README.md)

***

> **MediaItem** = \{ `alt?`: `string`; `src`: `string`; `type`: `"image"`; \} \| \{ `alt?`: `string`; `poster?`: `string`; `src`: `string`; `type`: `"video"`; \}

Defined in: data/projects.ts:10

Elemento multimedia de un proyecto.

## Remarks

- Para imágenes usa `alt` descriptivo (a11y).
- Para vídeos puedes aportar `poster` para mejorar la carga percibida.

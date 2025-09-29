[**mi-portfolio**](../../../README.md)

***

> **Project** = `object`

Defined in: data/projects.ts:25

Modelo de un proyecto mostrado en la sección “Proyectos”.

## Properties

### demo?

> `optional` **demo**: `string` \| `null`

Defined in: data/projects.ts:31

URL de demo; `null` si no hay demo pública.

***

### description

> **description**: `string`

Defined in: data/projects.ts:27

Descripción concisa (2–4 líneas máx.).

***

### github?

> `optional` **github**: `string` \| `null`

Defined in: data/projects.ts:30

URL del repo; `null` si es privado/no disponible.

***

### media?

> `optional` **media**: [`MediaItem`](MediaItem.md)[]

Defined in: data/projects.ts:29

Galería opcional: imágenes y/o vídeo.

***

### note?

> `optional` **note**: `string`

Defined in: data/projects.ts:32

Nota opcional (p. ej., “Código privado”).

***

### tags

> **tags**: `string`[]

Defined in: data/projects.ts:28

Tecnologías/temas; se mapean a tonos visuales.

***

### title

> **title**: `string`

Defined in: data/projects.ts:26

Título corto y claro del proyecto.

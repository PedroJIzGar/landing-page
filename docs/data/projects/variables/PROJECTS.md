[**mi-portfolio**](../../../README.md)

***

> `const` **PROJECTS**: [`Project`](../type-aliases/Project.md)[]

Defined in: data/projects.ts:51

Lista de proyectos para la sección “Proyectos”.

## Remarks

- Coloca los archivos en **`/public/media/...`** para poder referenciarlos con rutas absolutas (`/media/...`)
  sin importarlos: Vite los servirá estáticamente.
- Mantén `github`/`demo` en `null` cuando no quieras renderizar enlaces activos.
- `media` puede mezclar imágenes y un único vídeo (o varios, si lo necesitas).

## Example

```ts
PROJECTS[0].media?.[0] // => { type: "image", src: "/media/..." }
```

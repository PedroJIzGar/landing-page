[**mi-portfolio**](../../../README.md)

***

> `const` **SITE**: `object`

Defined in: config/site.ts:30

Metadatos globales del sitio/portfolio.

## Type Declaration

### email

> **email**: `string` = `"pedro.j.izdo@gmail.com"`

Email de contacto principal

### github

> **github**: `string` = `"https://github.com/tuusuario"`

URL del perfil de GitHub (usar protocolo https)

### heroPitch

> **heroPitch**: `string` = `"Desarrollador Full-Stack junior con base sólida en Angular 17 y Spring Boot 3. Experiencia construyendo SPA bien tipadas (TypeScript) y APIs REST en microservicios con PostgreSQL y autenticación vía Firebase/JWT. He desarrollado proyectos propios como TimeLogic (gestión de turnos y fichajes) y Outfique (asistente de outfits con IA), además de una feria de empleo virtual en prácticas (Fundación Medac). Me muevo con Git/GitHub, Docker y buenas prácticas (clean code, testing)."`

Párrafo de presentación del Hero.
Recomendado: conciso y orientado a impacto/responsabilidades.

### linkedin

> **linkedin**: `string` = `"https://www.linkedin.com/in/pedro-jose-izquierdo-garcia-233030162"`

URL del perfil de LinkedIn (usar protocolo https)

### location

> **location**: `string` = `"Murcia, España"`

Ubicación textual

### name

> **name**: `string` = `"Pedro J. Izquierdo García"`

Nombre visible en el Hero y pie

### resumeUrl

> **resumeUrl**: `string` = `"#"`

Enlace al CV (PDF o página externa).
Reemplaza `#` cuando tengas el recurso final.

### role

> **role**: `string` = `"Full-Stack Developer · Angular · Node.js · Spring Boot"`

Titular de rol/stack corto

### tech

> **tech**: [`Tech`](../../../types/type-aliases/Tech.md)[]

Tecnologías destacadas para chips en el Hero.
Los iconos provienen de `lucide-react`.

## Remarks

- Estos datos se consumen en varias secciones (Hero, Header, Footer, Contact).
- Mantén URLs absolutas (con protocolo) para evitar problemas en producción.
- El array `tech` se usa para renderizar badges con iconos (vía lucide-react).

## Example

```ts
SITE.github        // => "https://github.com/tuusuario"
SITE.tech[0].name  // => "Angular"
```

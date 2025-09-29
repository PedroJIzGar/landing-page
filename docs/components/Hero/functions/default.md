[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Hero.tsx:29

Sección Hero con presentación, CTAs principales y un panel visual con imagen y highlights.

## Returns

`Element`

## Remarks

- **Layout**: grid de 12 columnas en desktop (7 texto / 5 imagen), con `items-start` para alinear arriba.
- **Decoración**: fondo radial sutil que usa los tokens de color suaves.
- **Accesibilidad**: enlaces con `aria-label`, iconos con `aria-hidden`, contraste mediante variables de tema.
- **Rendimiento**: la imagen del perfil se importa como asset para que Vite gestione hashing y optimización.
- **Interacciones**: animaciones suaves con Framer Motion; botones con foco visible (`focus-visible`).

## Example

```tsx
<Hero />
```

## See

 - [Card](../../ui/Card/functions/default.md) para el contenedor visual del panel de imagen/highlights.
 - [Badge](../../ui/Badge/functions/default.md) para los chips de tecnologías.
 - [SITE](../../../config/site/variables/SITE.md) para los datos de presentación (nombre, rol, pitch, enlaces).

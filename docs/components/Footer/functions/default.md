[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Footer.tsx:69

Pie de página del sitio con derechos, enlaces sociales y acceso rápido “volver arriba”.

## Returns

`Element`

## Remarks

- Usa borde superior con `--border` y un tinte sutil del fondo (`soft-mint`).
- En móviles muestra un botón “Arriba” hacia `#home`; en desktop se omite.
- Los enlaces sociales reutilizan `SocialLink` para consistencia y a11y.

## Example

```tsx
<Footer />
```

## See

 - SocialLink para el patrón de enlace social accesible.
 - [SITE](../../../config/site/variables/SITE.md) para los metadatos (github, linkedin, email).

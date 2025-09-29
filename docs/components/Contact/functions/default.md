[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Contact.tsx:28

Sección de contacto con dos zonas:
1) **Panel visual** (solo desktop): contexto, expectativas y vías alternativas (email, redes).
2) **Formulario** (siempre visible): nombre, email y mensaje (demo).

## Returns

`Element`

## Remarks

- En pantallas grandes usa un grid 12 columnas: panel (col-span-5) + form (col-span-7).
- En móvil se oculta el panel para reducir ruido y foco en la acción principal.
- Mantiene accesibilidad: `label`/`htmlFor`, `aria-describedby` para texto de ayuda,
  `focus-visible` y contraste mediante tokens CSS.
- El formulario es **demo**: intercepta `submit` y no envía datos reales.

## Example

```tsx
<Contact />
```

## See

 - [Section](../../layout/Section/functions/default.md) para el contenedor de sección con título y subtítulo.
 - [Card](../../ui/Card/functions/default.md) para el contenedor visual de tarjetas.

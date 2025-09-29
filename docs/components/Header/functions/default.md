[**mi-portfolio**](../../../README.md)

***

> **default**(): `Element`

Defined in: components/Header.tsx:106

Cabecera fija con navegación, resalte de sección activa (IntersectionObserver)
y CTA de descarga de CV. Incluye drawer móvil con bloqueo de scroll y cierre por ESC.

## Returns

`Element`

## Remarks

- **A11y**: `aria-current="page"` en el enlace activo; foco visible con `ring`.
- **UX móvil**: bloqueo de `body` scroll cuando el menú está abierto.
- **Resalte activo**: IntersectionObserver prioriza el elemento con mayor ratio visible.
- **Sticky**: cabecera fija con blur y borde que usa tokens (`--surface`, `--border`).

## Example

```tsx
<Header />
```

## See

NavLink para los enlaces de navegación.

import { type ReactNode } from "react";

/**
 * Variantes cromáticas del `Badge`.
 *
 * - `mint` / `sand` / `coral`: acentos suaves de la paleta.
 * - `primary` / `secondary`: tokens de marca.
 * - `neutral`: gris sutil para estados neutros.
 *
 * @public
 */
type Tone = "mint" | "sand" | "coral" | "primary" | "secondary" | "neutral";

/**
 * Mapa de fondos por tono usando `color-mix` para asegurar contraste adecuado
 * con el texto en la mayoría de temas/fondos.
 *
 * @remarks
 * El borde usa `--border` y el color de texto se calcula con `color-mix` respecto a `--text`.
 *
 * @internal
 */
const bgByTone: Record<Tone, string> = {
  // mezclas suaves para que el texto tenga buen contraste
  mint: "color-mix(in srgb, var(--soft-mint) 22%, white)",
  sand: "color-mix(in srgb, var(--soft-sand) 28%, white)",
  coral: "color-mix(in srgb, var(--soft-coral) 20%, white)",
  primary: "color-mix(in srgb, var(--primary) 18%, white)",
  secondary: "color-mix(in srgb, var(--secondary) 18%, white)",
  neutral: "color-mix(in srgb, #e5e7eb 35%, white)", // gray-200 mix
};

/**
 * Etiqueta (chip) compacta para mostrar tecnologías, estados o metadatos.
 *
 * @remarks
 * - Usa esquinas totalmente redondeadas y tipografía compacta (`leading-none`) para ahorrar espacio.
 * - Mantiene buen contraste con mezclas suaves de la paleta y un borde sutil (`--border`).
 * - El contenido es libre: texto simple o icono + texto.
 *
 * @param children - Contenido del badge (texto y/o iconos).
 * @param tone - Variante de color del badge. Por defecto `"mint"`.
 *
 * @example
 * Render básico:
 * ```tsx
 * <Badge>React</Badge>
 * ```
 *
 * @example
 * Con tono de marca y un icono:
 * ```tsx
 * <Badge tone="primary">
 *   <span className="inline-flex items-center gap-1">
 *     <Star className="h-3.5 w-3.5" aria-hidden="true" /> Destacado
 *   </span>
 * </Badge>
 * ```
 *
 * @public
 */
export default function Badge({
  children,
  tone = "mint",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-sm font-medium leading-none"
      style={{
        background: bgByTone[tone],
        borderColor: "var(--border)",
        color: "color-mix(in srgb, var(--text) 85%, transparent)",
      }}
    >
      {children}
    </span>
  );
}

import { type ReactNode } from "react";

/**
 * Props del contenedor `Card`.
 *
 * @property children - Contenido del card.
 * @property className - Clases extra a añadir al contenedor.
 * @property interactive - Si `true`, eleva la sombra al hover y muestra anillo de foco accesible
 *   cuando un elemento dentro recibe foco (`focus-within`).
 * @property padding - Relleno interno del card (`"none" | "sm" | "md" | "lg"`). Por defecto `"lg"`.
 *
 * @public
 */
type Props = {
  children: ReactNode;
  className?: string;
  /** Anima/eleva al hover y muestra foco accesible en hijos */
  interactive?: boolean;
  /** Relleno interno del card */
  padding?: "none" | "sm" | "md" | "lg";
};

/**
 * Mapa de clases utilitarias para el padding del card.
 *
 * @remarks
 * Se usa internamente para traducir el prop `padding` en clases Tailwind.
 *
 * @internal
 */
const pad = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

/**
 * Contenedor visual con borde, superficie y blur sutil.
 *
 * @remarks
 * - Respeta los tokens de diseño (`--surface`, `--border`, `--ring`).
 * - Cuando `interactive` es `true`, aplica elevación en hover y anillo de foco
 *   accesible con `focus-within` para mejorar la UX al navegar con teclado.
 * - La variante de padding se controla mediante el prop `padding`.
 *
 * @example
 * Card básico:
 * ```tsx
 * <Card>
 *   <h3 className="text-lg font-semibold">Título</h3>
 *   <p>Contenido del card…</p>
 * </Card>
 * ```
 *
 * @example
 * Card interactivo con padding pequeño:
 * ```tsx
 * <Card interactive padding="sm">
 *   <button className="rounded px-3 py-1 focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
 *     Acción
 *   </button>
 * </Card>
 * ```
 *
 * @public
 */
export default function Card({
  children,
  className = "",
  interactive = false,
  padding = "lg",
}: Props) {
  return (
    <div
      className={[
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur",
        "shadow-sm transition-all",
        interactive && "hover:shadow-md hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[var(--ring)]",
        pad[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

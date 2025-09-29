import { motion } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Props del contenedor semántico de sección.
 *
 * @property id - Ancla único de la sección. Se usa para navegación por hash (`#id`) y `scroll-margin`.
 * @property title - Título visible renderizado como `<h2>`.
 * @property subtitle - (Opcional) Subtítulo descriptivo que aparece bajo el título.
 * @property children - Contenido arbitrario de la sección.
 *
 * @public
 */
type Props = {
    id: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
};

/**
 * Contenedor de sección con título, subtítulo opcional y animaciones sutiles.
 *
 * @remarks
 * - Renderiza una estructura semántica accesible: `<section>` → `<h2>` → contenido.
 * - Aplica `scroll-mt-28` para que, al navegar por hash, el título no quede oculto bajo el header sticky.
 * - Usa `framer-motion` para animaciones de aparición con `viewport.once` (se animan solo la primera vez).
 * - La barra de acento bajo el título utiliza el token `--primary`.
 *
 * @example
 * ```tsx
 * <Section id="projects" title="Proyectos" subtitle="Selección reciente">
 *   <Projects />
 * </Section>
 * ```
 *
 * @public
 */
export default function Section({ id, title, subtitle, children }: Props) {
    return (
        <section id={id} className="py-20 md:py-12 scroll-mt-28">
            <div className="mx-auto max-w-6xl px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ color: "var(--text)" }}
                >
                    {title}
                </motion.h2>

                {/* Barra de acento bajo el título */}
                <div className="mt-2 h-1 w-14 rounded-full" style={{ background: "var(--primary)" }} />

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="mt-3 max-w-2xl"
                        style={{ color: "var(--text-muted)" }}
                    >
                        {subtitle}
                    </motion.p>
                )}

                <div className="mt-10">{children}</div>
            </div>
        </section>
    );
}

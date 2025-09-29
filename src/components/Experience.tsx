import { motion } from "framer-motion";
import Section from "./layout/Section";
import Card from "./ui/Card";
import { EXPERIENCE } from "../data/experience";
import { Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import type { CSSProperties } from "react";

/**
 * Entrada de experiencia mostrada en el timeline.
 *
 * @property role - Puesto o rol desempeñado.
 * @property company - Empresa u organización.
 * @property period - Periodo legible (ej.: "2023 — 2024").
 * @property bullets - Lista de logros o responsabilidades (puntos cortos).
 * @property location - (Opcional) Ciudad/país o remoto.
 * @property link - (Opcional) URL de la empresa o del proyecto.
 *
 * @public
 */
type Item = {
    role: string;
    company: string;
    period: string;
    bullets: string[];
    location?: string;   // opcional si luego quieres añadirlo en data
    link?: string;       // opcional (web de empresa / proyecto)
};

/**
 * Estilo del marcador (dot) de la línea temporal.
 *
 * @remarks
 * Tipado para permitir la variable de anillo `--tw-ring-color` (Tailwind).
 * Se colorea con `--primary` y un ring mezclado para mejor contraste.
 *
 * @internal
 */
const markerStyle: CSSProperties & { ["--tw-ring-color"]?: string } = {
    background: "var(--primary)",
    ["--tw-ring-color"]: "color-mix(in srgb, var(--primary) 35%, white)",
};

/**
 * Sección de Experiencia con una línea temporal accesible.
 *
 * @remarks
 * - Usa semántica `<ol>`/`<li>` para representar la progresión temporal.
 * - Cada hito se renderiza dentro de un `Card` con cabecera (rol/empresa/periodo)
 *   y una lista de logros con iconos.
 * - Animaciones de aparición mediante `framer-motion`, con `viewport.once`.
 * - El borde izquierdo de la línea usa una mezcla de `--primary` y `--border` para
 *   integrarse con el tema.
 *
 * @example
 * ```tsx
 * <Experience />
 * ```
 *
 * @see {@link Section} contenedor semántico de sección.
 * @see {@link Card} contenedor visual de cada hito.
 *
 * @public
 */
export default function Experience() {
    const items = EXPERIENCE as Item[];

    return (
        <Section
            id="experience"
            title="Experiencia"
            subtitle="Trayectoria reciente, responsabilidades y logros relevantes."
        >
            {/* Timeline semántico */}
            <ol
                className="relative border-s-2"
                style={{ borderColor: "color-mix(in srgb, var(--primary) 30%, var(--border))" }}
                aria-label="Línea temporal de experiencia"
            >
                {items.map((e, idx) => (
                    <li key={`${e.role}-${idx}`} className="ms-4 pb-10 last:pb-0">
                        {/* Marker */}
                        <span
                            className="absolute -start-[9px] mt-1 h-4 w-4 rounded-full ring-4"
                            style={markerStyle}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ duration: 0.45, delay: idx * 0.05 }}
                        >
                            <Card interactive padding="lg" className="focus-within:outline-none">
                                {/* Cabecera: rol + periodo */}
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 rounded-md p-2"
                                            style={{ background: "color-mix(in srgb, var(--primary) 12%, white)" }}
                                        >
                                            <Building2 className="h-5 w-5" style={{ color: "var(--primary)" }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-semibold leading-snug">{e.role}</h3>
                                            <div className="mt-0.5 flex flex-wrap items-center gap-3 text-sm text-[var(--text)]/80">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Building2 className="h-4 w-4 opacity-70" />
                                                    {e.company}
                                                </span>
                                                {e.location && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4 opacity-70" />
                                                        {e.location}
                                                    </span>
                                                )}
                                                {e.link && (
                                                    <a
                                                        href={e.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="underline-offset-4 hover:underline"
                                                        style={{ color: "var(--primary)" }}
                                                    >
                                                        Ver más
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <span
                                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                                        style={{
                                            background: "color-mix(in srgb, var(--soft-sand) 28%, white)",
                                            color: "color-mix(in srgb, var(--text) 85%, transparent)",
                                        }}
                                    >
                                        <Calendar className="h-3.5 w-3.5" />
                                        {e.period}
                                    </span>
                                </div>

                                {/* Bullets de logros (checklist) */}
                                <ul className="mt-4 space-y-2">
                                    {e.bullets.map((b, i) => (
                                        <li key={`${i}-${b}`} className="flex gap-2 text-sm text-[var(--text)]/85">
                                            <CheckCircle2
                                                className="mt-0.5 h-4 w-4 shrink-0"
                                                style={{ color: "var(--primary)" }}
                                            />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </motion.div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}

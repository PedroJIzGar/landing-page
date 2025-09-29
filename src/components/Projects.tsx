import { ExternalLink, Github, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Section from "./layout/Section";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { PROJECTS, type Project, type MediaItem } from "../data/projects";
import { useState } from "react";

// ---------- Ajustes visuales ----------

/**
 * Altura mínima sugerida para las cards de proyecto.
 * Mantiene alineado el grid aunque cambie la longitud de textos.
 *
 * @internal
 */
const CARD_MIN_H = 600;

/** Altura mínima reservada para el título. */
const TITLE_MIN_H = "3.2rem";
/** Altura mínima reservada para la descripción. */
const DESC_MIN_H = "6rem";
/** Altura mínima reservada para el bloque de tags. */
const TAGS_MIN_H = "48px";

/**
 * Determina el tono visual del `<Badge>` en función de una etiqueta.
 *
 * @remarks
 * Mapear tags → tonos ayuda a la lectura rápida por categorías
 * (frontend, backend, data/devops, testing).
 *
 * @param tag - Texto de la etiqueta (case-insensitive).
 * @returns Tono compatible con el componente `Badge`.
 *
 * @example
 * ```ts
 * toneFor("React") // => "mint"
 * toneFor("Spring") // => "sand"
 * ```
 */
function toneFor(tag: string): Parameters<typeof Badge>[0]["tone"] {
    const t = tag.toLowerCase();
    if (/react|angular|vue|ui|css|tailwind|typescript|javascript|vite|next/.test(t)) return "mint";
    if (/java|spring|node|express|api|backend|prisma|nest/.test(t)) return "sand";
    if (/postgres|mysql|docker|devops|k8s|redis|ci|cd/.test(t)) return "coral";
    if (/test|jest|vitest|cypress|playwright|junit/.test(t)) return "secondary";
    return "neutral";
}

/**
 * Carrusel accesible y minimalista para imágenes/vídeos de proyectos.
 *
 * @remarks
 * - Soporta `image` con `alt` y `video` con `controls` y `poster`.
 * - Botones Anterior/Siguiente con labels (`aria-label`) y dots navegables (`aria-current`).
 * - Reinicia el elemento `<video>` al cambiar de slide mediante `key`.
 *
 * @param items - Lista de elementos multimedia (ver {@link MediaItem}).
 *
 * @example
 * ```tsx
 * <Carousel items={[{ type: "image", src: "/media/shot.jpg", alt: "Captura" }]} />
 * ```
 *
 * @public
 */
function Carousel({ items }: { items: MediaItem[] }) {
    const [i, setI] = useState(0);
    const len = items.length;
    if (!len) return null;

    const go = (d: number) => setI((p) => (p + d + len) % len);
    const current = items[i];

    return (
        <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-[var(--chip)]">
                {current.type === "image" ? (
                    <img
                        src={current.src}
                        alt={current.alt ?? ""}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <video
                        key={current.src} /* reinicia controles al cambiar slide */
                        className="h-full w-full object-cover"
                        controls
                        poster={current.poster}
                        aria-label={current.alt ?? "Vídeo del proyecto"}
                    >
                        <source src={current.src} />
                        Tu navegador no soporta video HTML5.
                    </video>
                )}
            </div>

            {/* Controles */}
            {len > 1 && (
                <>
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center rounded-full border p-2
                       bg-[color-mix(in_srgb,var(--soft-mint)_18%,white)] border-[var(--border)]"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center rounded-full border p-2
                       bg-[color-mix(in_srgb,var(--soft-mint)_18%,white)] border-[var(--border)]"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setI(idx)}
                                aria-label={`Ir al slide ${idx + 1}`}
                                aria-current={i === idx ? "true" : "false"}
                                className="h-2.5 w-2.5 rounded-full"
                                style={{
                                    background: i === idx ? "var(--primary)" : "color-mix(in srgb, var(--text) 30%, transparent)",
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Indicador de vídeo */}
            {current.type === "video" && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
                    <Play className="h-3 w-3" /> Vídeo
                </span>
            )}
        </div>
    );
}

/**
 * Sección “Proyectos” con grid responsivo y cards de altura alineada.
 *
 * @remarks
 * - Reserva alturas mínimas para **título**, **descripción** y **tags** (alineación visual).
 * - Cada card usa `Card` y `Carousel`; si no hay media, muestra un placeholder.
 * - Acciones accesibles para **Código** y **Demo** con estados deshabilitados claros.
 * - Animaciones discretas con `framer-motion` y `viewport.once`.
 *
 * @example
 * ```tsx
 * <Projects />
 * ```
 *
 * @see {@link Project} modelo de datos de un proyecto.
 * @see {@link MediaItem} elementos multimedia soportados por el carrusel.
 * @public
 */
export default function Projects() {
    const items = PROJECTS as Project[];

    return (
        <Section id="projects" title="Proyectos" subtitle="Algunos trabajos y side-projects destacados.">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
                {items.map((p, idx) => {
                    const hasMedia = (p.media?.length ?? 0) > 0;
                    const hasDemo = !!p.demo;
                    const hasCode = !!p.github;

                    return (
                        <motion.article
                            key={p.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="h-full"
                        >
                            <div className="h-full" style={{ minHeight: CARD_MIN_H }}>
                                <Card interactive className="h-full overflow-hidden">
                                    <div className="grid h-full grid-rows-[auto_1fr_auto]">
                                        {/* Media (carrusel o placeholder) */}
                                        <figure className="group">
                                            {hasMedia ? (
                                                <Carousel items={p.media!} />
                                            ) : (
                                                <div className="aspect-video w-full overflow-hidden rounded-xl bg-[var(--chip)] grid place-items-center">
                                                    <span className="text-sm text-[var(--text-muted)]">Sin material visual</span>
                                                </div>
                                            )}
                                        </figure>

                                        {/* Contenido */}
                                        <figcaption className="p-5 flex flex-col">
                                            <h3
                                                className="text-lg font-semibold text-[var(--text)] clamp-2"
                                                style={{ minHeight: TITLE_MIN_H }}
                                            >
                                                {p.title}
                                            </h3>

                                            <p
                                                className="mt-1 text-sm text-[var(--text-muted)] clamp-4"
                                                style={{ minHeight: DESC_MIN_H }}
                                            >
                                                {p.description}
                                            </p>

                                            {p.note && (
                                                <p className="mt-2 text-xs text-[var(--text-muted)]">{p.note}</p>
                                            )}

                                            <ul
                                                className="mt-3 flex flex-wrap gap-2"
                                                style={{ minHeight: TAGS_MIN_H }}
                                                aria-label={`Tecnologías usadas en ${p.title}`}
                                            >
                                                {p.tags.map((t) => (
                                                    <li key={t}>
                                                        <Badge tone={toneFor(t)}>{t}</Badge>
                                                    </li>
                                                ))}
                                            </ul>
                                        </figcaption>

                                        {/* Acciones */}
                                        <div className="px-5 pb-5 pt-0 flex flex-wrap items-center gap-3 text-sm">
                                            {hasCode ? (
                                                <a
                                                    href={p.github!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
                                     transition-colors"
                                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                                    onMouseOver={(e) =>
                                                    (e.currentTarget.style.background =
                                                        "color-mix(in srgb, var(--soft-mint) 22%, white)")
                                                    }
                                                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                                                    aria-label={`Ver código de ${p.title}`}
                                                >
                                                    <Github className="h-4 w-4" aria-hidden="true" /> Código
                                                </a>
                                            ) : (
                                                <span
                                                    className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 opacity-60"
                                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                                    aria-disabled="true"
                                                    title="Código privado o no disponible"
                                                >
                                                    <Github className="h-4 w-4" aria-hidden="true" /> Código
                                                </span>
                                            )}

                                            {hasDemo ? (
                                                <a
                                                    href={p.demo!}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 rounded-2xl px-3 py-1.5 font-medium
                                     text-[var(--on-primary)] shadow-sm
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
                                     transition-colors"
                                                    style={{ background: "var(--primary)" }}
                                                    onMouseOver={(e) => (e.currentTarget.style.background = "var(--primary-700)")}
                                                    onMouseOut={(e) => (e.currentTarget.style.background = "var(--primary)")}
                                                    aria-label={`Abrir demo de ${p.title}`}
                                                >
                                                    <ExternalLink className="h-4 w-4" aria-hidden="true" /> Demo
                                                </a>
                                            ) : (
                                                <span
                                                    className="inline-flex items-center gap-1 rounded-2xl px-3 py-1.5 font-medium opacity-60"
                                                    style={{
                                                        background: "color-mix(in srgb, var(--soft-sand) 24%, white)",
                                                        color: "var(--text)",
                                                    }}
                                                    aria-disabled="true"
                                                    title="Demo no disponible"
                                                >
                                                    <ExternalLink className="h-4 w-4" aria-hidden="true" /> Demo
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </Section>
    );
}

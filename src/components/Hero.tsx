import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { SITE } from "../config/site";
import profile from "../assets/profile.jpg";

/**
 * Sección Hero con presentación, CTAs principales y un panel visual con imagen y highlights.
 *
 * @remarks
 * - **Layout**: grid de 12 columnas en desktop (7 texto / 5 imagen), con `items-start` para alinear arriba.
 * - **Decoración**: fondo radial sutil que usa los tokens de color suaves.
 * - **Accesibilidad**: enlaces con `aria-label`, iconos con `aria-hidden`, contraste mediante variables de tema.
 * - **Rendimiento**: la imagen del perfil se importa como asset para que Vite gestione hashing y optimización.
 * - **Interacciones**: animaciones suaves con Framer Motion; botones con foco visible (`focus-visible`).
 *
 * @example
 * ```tsx
 * <Hero />
 * ```
 *
 * @see {@link Card} para el contenedor visual del panel de imagen/highlights.
 * @see {@link Badge} para los chips de tecnologías.
 * @see {@link SITE} para los datos de presentación (nombre, rol, pitch, enlaces).
 *
 * @public
 */
export default function Hero() {
    return (
        <section id="home" className="relative overflow-hidden">
            {/* Fondo decorativo sutil */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60rem 30rem at 80% -10%, color-mix(in srgb, var(--soft-mint) 18%, white), transparent 60%)",
                }}
            />

            {/* items-start para alinear arriba las dos columnas */}
            <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-14 md:grid-cols-12 md:pt-16 md:pb-20">
                {/* Columna texto */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="order-2 md:order-1 md:col-span-7"
                >
                    {/* Availability pill */}
                    <div
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                        style={{
                            borderColor: "var(--border)",
                            background: "color-mix(in srgb, var(--soft-mint) 18%, white)",
                            color: "color-mix(in srgb, var(--text) 70%, transparent)",
                        }}
                    >
                        <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: "var(--primary)" }} />
                        Disponible · Open to work
                    </div>

                    {/* Title & role */}
                    <h1
                        className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
                        style={{ color: "var(--text)" }}
                    >
                        {SITE.name}
                    </h1>
                    <p className="mt-2 text-lg" style={{ color: "var(--text-muted)" }}>
                        {SITE.role}
                    </p>

                    {/* Pitch */}
                    <p className="mt-4 max-w-2xl" style={{ color: "color-mix(in srgb, var(--text) 82%, transparent)" }}>
                        {SITE.heroPitch}
                    </p>

                    {/* CTAs */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-sm
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-[background,box-shadow,transform]"
                            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "var(--primary-700)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "var(--primary)")}
                            aria-label="Ir a contacto para hablar"
                        >
                            <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                            Hablemos
                        </a>

                        <a
                            href={SITE.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--soft-mint) 22%, white)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                            aria-label="Abrir GitHub en nueva pestaña"
                        >
                            <Github className="h-4 w-4" aria-hidden="true" /> GitHub
                        </a>

                        <a
                            href={SITE.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--soft-mint) 22%, white)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                            aria-label="Abrir LinkedIn en nueva pestaña"
                        >
                            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                        </a>
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                        <MapPin className="h-4 w-4" aria-hidden="true" /> {SITE.location}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {SITE.tech.map((t) => (
                            <Badge key={t.name} tone="mint">
                                <span className="inline-flex items-center gap-1">
                                    <t.icon className="h-4 w-4" aria-hidden="true" /> {t.name}
                                </span>
                            </Badge>
                        ))}
                    </div>
                </motion.div>

                {/* Columna imagen / highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="order-1 md:order-2 md:col-span-5 md:sticky md:top-20"
                >
                    <Card padding="lg" className="h-full">
                        {/* Imagen: aspect en móvil, altura fija en desktop para alinear */}
                        <div
                            className="w-full overflow-hidden rounded-xl flex items-center justify-center
                         aspect-[4/5] md:aspect-auto md:h-[440px]"
                            style={{
                                background:
                                    "linear-gradient(140deg, color-mix(in srgb, var(--soft-mint) 22%, white), color-mix(in srgb, var(--soft-sand) 22%, white))",
                            }}
                        >
                            {/* Sustituye el span por tu <img> si no necesitas texto adicional */}
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                                <img src={profile} alt="Foto de perfil" />
                            </span>
                        </div>

                        {/* Highlights */}
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-xl p-3" style={{ background: "color-mix(in srgb, var(--soft-mint) 18%, white)" }}>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                    Experiencia
                                </p>
                                <p className="font-semibold" style={{ color: "var(--text)" }}>
                                    +1 años en proyectos
                                </p>
                            </div>
                            <div className="rounded-xl p-3" style={{ background: "color-mix(in srgb, var(--soft-sand) 24%, white)" }}>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                    Stack
                                </p>
                                <p className="font-semibold" style={{ color: "var(--text)" }}>
                                    Node · Angular · Spring
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}

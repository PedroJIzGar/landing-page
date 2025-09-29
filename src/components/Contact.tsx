import { Github, Linkedin, Mail as MailIcon, Clock, ShieldCheck } from "lucide-react";
import Section from "./layout/Section";
import Card from "./ui/Card";
import { SITE } from "../config/site";

/**
 * Sección de contacto con dos zonas:
 * 1) **Panel visual** (solo desktop): contexto, expectativas y vías alternativas (email, redes).
 * 2) **Formulario** (siempre visible): nombre, email y mensaje (demo).
 *
 * @remarks
 * - En pantallas grandes usa un grid 12 columnas: panel (col-span-5) + form (col-span-7).
 * - En móvil se oculta el panel para reducir ruido y foco en la acción principal.
 * - Mantiene accesibilidad: `label`/`htmlFor`, `aria-describedby` para texto de ayuda,
 *   `focus-visible` y contraste mediante tokens CSS.
 * - El formulario es **demo**: intercepta `submit` y no envía datos reales.
 *
 * @example
 * ```tsx
 * <Contact />
 * ```
 *
 * @see {@link Section} para el contenedor de sección con título y subtítulo.
 * @see {@link Card} para el contenedor visual de tarjetas.
 *
 * @public
 */
export default function Contact() {
    return (
        <Section
            id="contact"
            title="Contacto"
            subtitle="¿Tienes una idea, vacante o colaboración? Escríbeme y te respondo."
        >
            <div className="grid gap-8 md:grid-cols-12 items-stretch">
                {/* Panel visual (solo desktop) */}
                <div className="hidden md:block md:col-span-5">
                    <Card padding="lg" className="h-full">
                        <div
                            className="relative flex h-full flex-col justify-between rounded-2xl p-6"
                            aria-hidden="true"
                            style={{
                                background:
                                    "linear-gradient(140deg, color-mix(in srgb, var(--soft-mint) 22%, white), color-mix(in srgb, var(--soft-sand) 24%, white))",
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="grid place-items-center rounded-2xl p-3"
                                    style={{ background: "color-mix(in srgb, var(--soft-mint) 28%, white)" }}
                                >
                                    <MailIcon className="h-8 w-8" style={{ color: "var(--primary)" }} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                                        Hablemos
                                    </h3>
                                    <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                                        Cuéntame tu idea en 2–3 frases. Te respondo con próximos pasos.
                                    </p>
                                </div>
                            </div>

                            <ul className="mt-6 space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" aria-hidden="true" />
                                    <span style={{ color: "var(--text)" }}>Tiempo de respuesta habitual &lt; 24h</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                                    <span style={{ color: "var(--text)" }}>
                                        Sin spam · Solo usaré tus datos para responder
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-6 grid gap-2 text-sm">
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                >
                                    <MailIcon className="h-4 w-4" aria-hidden="true" /> {SITE.email}
                                </a>
                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={SITE.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                                        style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                    >
                                        <Github className="h-4 w-4" aria-hidden="true" /> GitHub
                                    </a>
                                    <a
                                        href={SITE.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                                        style={{ borderColor: "var(--border)", color: "var(--text)" }}
                                    >
                                        <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Formulario (siempre visible) */}
                <div className="md:col-span-7">
                    <Card padding="lg">
                        <div className="mx-auto w-full max-w-2xl">
                            <form
                                className="grid gap-5"
                                onSubmit={(e) => e.preventDefault()}
                                noValidate
                                aria-describedby="contact-help"
                            >
                                {/* Nombre + Email */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-1.5">
                                        <label htmlFor="name" className="text-sm font-medium text-[var(--text)]">
                                            Nombre <span className="text-[var(--text-muted)]">(requerido)</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            autoComplete="name"
                                            required
                                            className="h-11 rounded-xl border bg-transparent px-3 outline-none
                                 focus-visible:ring-2 focus-visible:ring-[var(--ring)] ring-offset-0
                                 text-[var(--text)] placeholder:text-[var(--text-muted)]"
                                            style={{ borderColor: "var(--border)" }}
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className="grid gap-1.5">
                                        <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
                                            Email <span className="text-[var(--text-muted)]">(requerido)</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            inputMode="email"
                                            autoComplete="email"
                                            required
                                            className="h-11 rounded-xl border bg-transparent px-3 outline-none
                                 focus-visible:ring-2 focus-visible:ring-[var(--ring)] ring-offset-0
                                 text-[var(--text)] placeholder:text-[var(--text-muted)]"
                                            style={{ borderColor: "var(--border)" }}
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Mensaje */}
                                <div className="grid gap-1.5">
                                    <label htmlFor="message" className="text-sm font-medium text-[var(--text)]">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        className="rounded-xl border bg-transparent px-3 py-2 outline-none
                               focus-visible:ring-2 focus-visible:ring-[var(--ring)] ring-offset-0
                               text-[var(--text)] placeholder:text-[var(--text-muted)]"
                                        style={{ borderColor: "var(--border)" }}
                                        placeholder="Cuéntame brevemente qué necesitas…"
                                    />
                                </div>

                                {/* Consentimiento + CTA */}
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <label className="inline-flex items-start gap-2 text-sm text-[var(--text)]/85">
                                        <input
                                            type="checkbox"
                                            className="mt-0.5 h-4 w-4 rounded border"
                                            style={{ borderColor: "var(--border)" }}
                                        />
                                        Acepto que me contactes en respuesta a este mensaje.
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold
                                 text-[var(--on-primary)] shadow transition-colors focus-visible:outline-none
                                 focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                                            style={{ background: "var(--primary)" }}
                                            onMouseOver={(e) => (e.currentTarget.style.background = "var(--primary-700)")}
                                            onMouseOut={(e) => (e.currentTarget.style.background = "var(--primary)")}
                                        >
                                            Enviar (demo)
                                        </button>
                                        <p id="contact-help" className="text-xs text-[var(--text-muted)]">
                                            * Formulario de demo. Conéctalo a EmailJS, Resend o tu API.
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </Section>
    );
}

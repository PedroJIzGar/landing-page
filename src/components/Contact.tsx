import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail as MailIcon, Clock, ShieldCheck } from "lucide-react";
import Section from "./layout/Section";
import Card from "./ui/Card";
import { SITE } from "../config/site";
import emailjs from "@emailjs/browser";

function getErrorMessage(err: unknown): string {
    if (typeof err === "string") return err;
    if (err && typeof err === "object") {
        // @ts-expect-error – acceso defensivo
        if (typeof err.message === "string") return err.message;
        // @ts-expect-error – algunos SDK devuelven `text`
        if (typeof err.text === "string") return err.text;
    }
    return "";
}

/**
 * Sección de contacto con dos zonas:
 * 1) Panel visual (desktop): contexto, expectativas y vías alternativas.
 * 2) Formulario (siempre visible): nombre, email y mensaje.
 *
 * Envío con EmailJS (service/template/publicKey desde variables de entorno).
 *
 * Accesibilidad:
 * - labels asociadas, aria-live para feedback, focus-visible en CTA.
 * - Botón deshabilitado durante envío; mensajes de estado con roles.
 *
 * Anti-spam:
 * - "honeypot" oculto (campo `website`), si viene relleno se ignora el envío.
 *
 * @public
 */
export default function Contact() {
    // ---------- Form state ----------
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [agree, setAgree] = useState(false);
    const [honeypot, setHoneypot] = useState(""); // bots only

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState<string>("");

    // ---------- ENV (Vite) ----------
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    const canSubmit =
        !loading &&
        agree &&
        name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(email) &&
        message.trim().length > 5;

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("idle");
        setErrorMsg("");

        // Honeypot: si está relleno, abortamos en silencio
        if (honeypot.trim() !== "") return;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setStatus("error");
            setErrorMsg(
                "Faltan credenciales de EmailJS. Define VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID y VITE_EMAILJS_PUBLIC_KEY."
            );
            return;
        }

        if (!canSubmit) return;

        setLoading(true);
        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: name,
                    reply_to: email,
                    message,
                    page_url: window.location.href,
                },
                { publicKey: PUBLIC_KEY }
            );

            setStatus("ok");
            setName("");
            setEmail("");
            setMessage("");
            setAgree(false);
        } catch (err: unknown) {
            setStatus("error");
            const msg = getErrorMessage(err);
            setErrorMsg(msg || "No se pudo enviar el mensaje.");
        } finally {
            setLoading(false);
        }
    }

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

                {/* Formulario */}
                <div className="md:col-span-7">
                    <Card padding="lg">
                        <div className="mx-auto w-full max-w-2xl">
                            <form
                                className="grid gap-5"
                                onSubmit={onSubmit}
                                noValidate
                                aria-describedby="contact-help"
                            >
                                {/* Honeypot oculto */}
                                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                                    <label>
                                        Do not fill this field:
                                        <input
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                        />
                                    </label>
                                </div>

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
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
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
                                            checked={agree}
                                            onChange={(e) => setAgree(e.target.checked)}
                                        />
                                        Acepto que me contactes en respuesta a este mensaje.
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            disabled={!canSubmit}
                                            className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold
                                 text-[var(--on-primary)] shadow transition-colors focus-visible:outline-none
                                 focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-60 disabled:cursor-not-allowed"
                                            style={{ background: "var(--primary)" }}
                                            onMouseOver={(e) => {
                                                if (!e.currentTarget.disabled) e.currentTarget.style.background = "var(--primary-700)";
                                            }}
                                            onMouseOut={(e) => {
                                                if (!e.currentTarget.disabled) e.currentTarget.style.background = "var(--primary)";
                                            }}
                                            aria-busy={loading}
                                        >
                                            {loading ? "Enviando…" : "Enviar"}
                                        </button>
                                        <p id="contact-help" className="text-xs text-[var(--text-muted)]">
                                            * Tus datos solo se usan para responder a este mensaje.
                                        </p>
                                    </div>
                                </div>

                                {/* Feedback de envío */}
                                <div aria-live="polite" className="text-sm">
                                    {status === "ok" && (
                                        <p
                                            role="status"
                                            className="rounded-md px-3 py-2"
                                            style={{
                                                background: "color-mix(in srgb, var(--soft-mint) 20%, white)",
                                                color: "var(--text)",
                                            }}
                                        >
                                            ¡Gracias! Tu mensaje se ha enviado correctamente.
                                        </p>
                                    )}
                                    {status === "error" && (
                                        <p
                                            role="alert"
                                            className="rounded-md px-3 py-2"
                                            style={{
                                                background: "color-mix(in srgb, var(--soft-coral) 22%, white)",
                                                color: "var(--text)",
                                            }}
                                        >
                                            No se pudo enviar el mensaje. {errorMsg}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </Section>
    );
}

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { SITE } from "../config/site";

/**
 * Enlace social con foco accesible y hover cromático usando tokens del tema.
 *
 * @param href - URL destino (externa).
 * @param label - Etiqueta accesible para `aria-label`.
 * @param children - Contenido (icono + texto).
 *
 * @remarks
 * - Abre en nueva pestaña con `rel="noopener noreferrer"`.
 * - Cambia el color en hover a `var(--primary)` sin alterar el layout.
 *
 * @example
 * ```tsx
 * <SocialLink href={SITE.github} label="GitHub">
 *   <Github className="h-4 w-4" />
 *   <span>GitHub</span>
 * </SocialLink>
 * ```
 *
 * @public
 */
function SocialLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            style={{ color: "inherit" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--primary)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
        >
            {children}
        </a>
    );
}

/**
 * Pie de página del sitio con derechos, enlaces sociales y acceso rápido “volver arriba”.
 *
 * @remarks
 * - Usa borde superior con `--border` y un tinte sutil del fondo (`soft-mint`).
 * - En móviles muestra un botón “Arriba” hacia `#home`; en desktop se omite.
 * - Los enlaces sociales reutilizan `SocialLink` para consistencia y a11y.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @see {@link SocialLink} para el patrón de enlace social accesible.
 * @see {@link SITE} para los metadatos (github, linkedin, email).
 *
 * @public
 */
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="border-t py-10"
            style={{
                borderColor: "var(--border)",
                // tinte suave del fondo (mint ~6%)
                background: "color-mix(in srgb, var(--soft-mint) 6%, white)",
            }}
        >
            <div className="mx-auto max-w-6xl px-4">
                <div
                    className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-3 text-sm"
                    style={{ color: "var(--text-muted)" }}
                >
                    {/* Copyright */}
                    <p className="text-center md:text-left">
                        © {year} {SITE.name}. Todos los derechos reservados.
                    </p>

                    {/* Social + Email */}
                    <div className="flex items-center gap-4" aria-label="Enlaces sociales">
                        <SocialLink href={SITE.github} label="GitHub">
                            <Github className="h-4 w-4" />
                            <span>GitHub</span>
                        </SocialLink>
                        <SocialLink href={SITE.linkedin} label="LinkedIn">
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                        </SocialLink>
                        <a
                            href={`mailto:${SITE.email}`}
                            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                            style={{ color: "inherit" }}
                            onMouseOver={(e) => (e.currentTarget.style.color = "var(--primary)")}
                            onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
                            aria-label={`Enviar email a ${SITE.email}`}
                        >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                        </a>
                    </div>

                    {/* Back to top (visible en móvil) */}
                    <a
                        href="#home"
                        className="md:hidden inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        style={{ borderColor: "var(--border)", color: "var(--text)" }}
                        aria-label="Volver arriba"
                    >
                        <ArrowUp className="h-4 w-4" />
                        Arriba
                    </a>
                </div>
            </div>
        </footer>
    );
}

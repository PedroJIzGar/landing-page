import { useEffect, useMemo, useState } from "react";
import { Download, Rocket, Menu, X } from "lucide-react";
import { SITE } from "../config/site";

/**
 * Identificadores de las secciones navegables en la landing.
 *
 * @public
 */
type SectionId = "home" | "projects" | "experience" | "skills" | "contact";

/**
 * Orden de aparición en el documento para el seguimiento del link activo.
 *
 * @internal
 */
const SECTIONS: SectionId[] = ["home", "projects", "experience", "skills", "contact"];

/**
 * Concatena clases ignorando falsy (patrón utility).
 *
 * @example
 * ```ts
 * classNames("a", cond && "b", null, undefined) // => "a b"
 * ```
 *
 * @internal
 */
function classNames(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

/**
 * Enlace de navegación accesible (desktop/mobile) con estado “activo”.
 *
 * @param href - Hash de la sección destino (ej. `#projects`) o URL.
 * @param children - Texto/contenido del enlace.
 * @param active - Si `true`, resalta el enlace como sección activa.
 * @param onClick - Handler opcional (por ej., cerrar el drawer móvil).
 * @param variant - Estilo de enlace (`"desktop"` | `"mobile"`).
 *
 * @example
 * ```tsx
 * <NavLink href="#skills" active={active === "skills"}>Skills</NavLink>
 * ```
 *
 * @public
 */
function NavLink({
    href,
    children,
    active,
    onClick,
    variant = "desktop",
}: {
    href: `#${SectionId}` | string;
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    variant?: "desktop" | "mobile";
}) {
    const base =
        "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-md";
    const desktop = classNames(
        "px-1.5 py-0.5 text-[var(--text)]/85 hover:text-[var(--text)] relative",
        active &&
        "text-[var(--text)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[var(--primary)]"
    );
    const mobile = classNames(
        "px-2 py-1",
        active
            ? "bg-[color-mix(in_srgb,var(--soft-mint)_25%,white)] text-[var(--text)]"
            : "text-[var(--text)]/85 hover:bg-[color-mix(in_srgb,var(--soft-mint)_20%,white)]"
    );

    return (
        <a
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className={classNames(base, variant === "desktop" ? desktop : mobile)}
        >
            {children}
        </a>
    );
}

/**
 * Cabecera fija con navegación, resalte de sección activa (IntersectionObserver)
 * y CTA de descarga de CV. Incluye drawer móvil con bloqueo de scroll y cierre por ESC.
 *
 * @remarks
 * - **A11y**: `aria-current="page"` en el enlace activo; foco visible con `ring`.
 * - **UX móvil**: bloqueo de `body` scroll cuando el menú está abierto.
 * - **Resalte activo**: IntersectionObserver prioriza el elemento con mayor ratio visible.
 * - **Sticky**: cabecera fija con blur y borde que usa tokens (`--surface`, `--border`).
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @see {@link NavLink} para los enlaces de navegación.
 * @public
 */
export default function Header() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<SectionId>("home");

    // Bloquea el scroll de fondo cuando el drawer móvil está abierto
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Cierre del drawer con tecla ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    /**
     * Opciones del IntersectionObserver para detectar la sección visible.
     * `rootMargin` adelanta el cambio y fija cuando ~45–50% del viewport está ocupado.
     *
     * @internal
     */
    const observerOptions = useMemo<IntersectionObserverInit>(
        () => ({
            root: null,
            rootMargin: "-120px 0px -55% 0px",
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }),
        []
    );

    // Configura IO y actualiza `active` según la sección con mayor ratio visible
    useEffect(() => {
        const els = SECTIONS.map((id) => document.getElementById(id)).filter(
            (n): n is HTMLElement => !!n
        );
        if (!els.length) return;

        let current: SectionId = active;
        const io = new IntersectionObserver((entries) => {
            const vis = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (vis?.target?.id && SECTIONS.includes(vis.target.id as SectionId)) {
                const id = vis.target.id as SectionId;
                if (id !== current) {
                    current = id;
                    setActive(id);
                }
            }
        }, observerOptions);

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerOptions]);

    const close = () => setOpen(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-[var(--surface)]/85 border-b border-[var(--border)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* Brand */}
                <a href="#home" className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    <span className="font-semibold">{SITE.name.split(" ")[0]} · Dev</span>
                </a>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLink href="#projects" active={active === "projects"}>
                        Proyectos
                    </NavLink>
                    <NavLink href="#experience" active={active === "experience"}>
                        Experiencia
                    </NavLink>
                    <NavLink href="#skills" active={active === "skills"}>
                        Skills
                    </NavLink>
                    <NavLink href="#contact" active={active === "contact"}>
                        Contacto
                    </NavLink>

                    {/* CV: CTA primario */}
                    <a
                        href={SITE.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir CV en una nueva pestaña"
                        title="Abrir CV"
                        className="group inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-semibold
                       text-[var(--on-primary)] bg-[var(--primary)] hover:bg-[var(--primary-700)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
                       shadow-sm hover:shadow transition-[background,box-shadow,transform]"
                    >
                        <Download className="h-4 w-4 transition-transform group-hover:translate-y-[-1px]" />
                        <span>CV</span>
                    </a>
                </nav>

                {/* Mobile trigger */}
                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center rounded-lg border border-[var(--border)] p-2
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    aria-label="Abrir menú"
                    aria-expanded={open}
                    aria-controls="mobile-drawer"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile panel */}
            {open && (
                <>
                    <button aria-label="Cerrar menú" className="fixed inset-0 bg-black/20" onClick={close} />
                    <div
                        id="mobile-drawer"
                        className="absolute inset-x-0 top-full border-t border-[var(--border)] bg-[var(--surface)]"
                    >
                        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2">
                            <NavLink href="#projects" active={active === "projects"} onClick={close} variant="mobile">
                                Proyectos
                            </NavLink>
                            <NavLink href="#experience" active={active === "experience"} onClick={close} variant="mobile">
                                Experiencia
                            </NavLink>
                            <NavLink href="#skills" active={active === "skills"} onClick={close} variant="mobile">
                                Skills
                            </NavLink>
                            <NavLink href="#contact" active={active === "contact"} onClick={close} variant="mobile">
                                Contacto
                            </NavLink>

                            {/* CV en móvil */}
                            <a
                                href={SITE.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={close}
                                aria-label="Abrir CV en una nueva pestaña"
                                title="Abrir CV"
                                className="mt-2 group inline-flex w-fit items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-semibold
                           text-[var(--on-primary)] bg-[var(--primary)] hover:bg-[var(--primary-700)]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
                           shadow-sm hover:shadow transition-[background,box-shadow,transform]"
                            >
                                <Download className="h-4 w-4 transition-transform group-hover:translate-y-[-1px]" />
                                <span>CV</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}

import { Code2, Cpu, Database, Layers, Palette } from "lucide-react";
import type { Tech } from "../types";

/**
 * Metadatos globales del sitio/portfolio.
 *
 * @remarks
 * - Estos datos se consumen en varias secciones (Hero, Header, Footer, Contact).
 * - Mantén URLs absolutas (con protocolo) para evitar problemas en producción.
 * - El array `tech` se usa para renderizar badges con iconos (vía lucide-react).
 *
 * @property name - Nombre completo a mostrar en el Hero y copyright.
 * @property role - Línea corta de rol/stack principal (aparece en el Hero).
 * @property email - Email de contacto (usado para mailto y en Contact).
 * @property location - Ubicación textual corta (aparece en Hero/Contact).
 * @property github - URL pública del perfil de GitHub.
 * @property linkedin - URL pública del perfil de LinkedIn.
 * @property resumeUrl - Enlace al CV (PDF o página). Puede ser `#` hasta tenerlo.
 * @property heroPitch - Párrafo de presentación (máx. 3–5 líneas recomendadas).
 * @property tech - Lista de tecnologías destacadas con icono para el Hero.
 *
 * @example
 * ```ts
 * SITE.github        // => "https://github.com/tuusuario"
 * SITE.tech[0].name  // => "Angular"
 * ```
 *
 * @public
 */
export const SITE = {
    /** Nombre visible en el Hero y pie */
    name: "Pedro J. Izquierdo García",

    /** Titular de rol/stack corto */
    role: "Full-Stack Developer · Angular · Node.js · Spring Boot",

    /** Email de contacto principal */
    email: "pedro.j.izdo@gmail.com",

    /** Ubicación textual */
    location: "Murcia, España",

    /** URL del perfil de GitHub (usar protocolo https) */
    github: "https://github.com/tuusuario",

    /** URL del perfil de LinkedIn (usar protocolo https) */
    linkedin: "https://www.linkedin.com/in/pedro-jose-izquierdo-garcia-233030162",


    /**
     * Enlace al CV (PDF o página externa).
     * Reemplaza `#` cuando tengas el recurso final.
     */
    resumeUrl: "#",

    /**
     * Párrafo de presentación del Hero.
     * Recomendado: conciso y orientado a impacto/responsabilidades.
     */
    heroPitch:
        "Desarrollador Full-Stack junior con base sólida en Angular 17 y Spring Boot 3. Experiencia construyendo SPA bien tipadas (TypeScript) y APIs REST en microservicios con PostgreSQL y autenticación vía Firebase/JWT. He desarrollado proyectos propios como TimeLogic (gestión de turnos y fichajes) y Outfique (asistente de outfits con IA), además de una feria de empleo virtual en prácticas (Fundación Medac). Me muevo con Git/GitHub, Docker y buenas prácticas (clean code, testing).",

    /**
     * Tecnologías destacadas para chips en el Hero.
     * Los iconos provienen de `lucide-react`.
     */
    tech: [
        { name: "Angular", icon: Layers },
        { name: "Spring Boot", icon: Cpu },
        { name: "Node.js", icon: Code2 },
        { name: "PostgreSQL", icon: Database },
        { name: "TailwindCSS", icon: Palette },
    ] as Tech[],
};

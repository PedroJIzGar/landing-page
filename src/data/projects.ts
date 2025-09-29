// src/data/projects.ts

/**
 * Elemento multimedia de un proyecto.
 *
 * @remarks
 * - Para imágenes usa `alt` descriptivo (a11y).
 * - Para vídeos puedes aportar `poster` para mejorar la carga percibida.
 */
export type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

/**
 * Modelo de un proyecto mostrado en la sección “Proyectos”.
 *
 * @property title       - Título corto y claro del proyecto.
 * @property description - Descripción concisa (2–4 líneas máx.).
 * @property tags        - Tecnologías/temas; se mapean a tonos visuales.
 * @property media       - Galería opcional: imágenes y/o vídeo.
 * @property github      - URL del repo; `null` si es privado/no disponible.
 * @property demo        - URL de demo; `null` si no hay demo pública.
 * @property note        - Nota opcional (p. ej., “Código privado”).
 */
export type Project = {
  title: string;
  description: string;
  tags: string[];
  media?: MediaItem[];          // imágenes y/o vídeo
  github?: string | null;       // si es privado, null
  demo?: string | null;         // si no hay demo, null
  note?: string;                // opcional (p.ej. “Código privado”)
};

/**
 * Lista de proyectos para la sección “Proyectos”.
 *
 * @remarks
 * - Coloca los archivos en **`/public/media/...`** para poder referenciarlos con rutas absolutas (`/media/...`)
 *   sin importarlos: Vite los servirá estáticamente.
 * - Mantén `github`/`demo` en `null` cuando no quieras renderizar enlaces activos.
 * - `media` puede mezclar imágenes y un único vídeo (o varios, si lo necesitas).
 *
 * @example
 * ```ts
 * PROJECTS[0].media?.[0] // => { type: "image", src: "/media/..." }
 * ```
 *
 * @public
 */
export const PROJECTS: Project[] = [
  {
    title: "TimeLogic · Gestión de turnos & fichajes",
    description:
      "SPA de fichajes y turnos. Front hecho: panel, calendario, exportaciones y PDF.",
    tags: ["Angular 17", "Spring Boot 3", "PostgreSQL", "Firebase Auth"],
    media: [
      { type: "image", src: "/media/timelogic-1.jpg", alt: "Dashboard de TimeLogic" },
      { type: "image", src: "/media/timelogic-2.jpg", alt: "Calendario de turnos" },
      { type: "image", src: "/media/timelogic-3.jpg", alt: "Panel de fichajes" },
    ],
    github: null, // privado o repo no público
    demo: null,   // sin demo pública
    note: "Proyecto con capturas del Front (sin demo pública).",
  },
  {
    title: "Outfique · AI Outfit Assistant (Backend en progreso)",
    description:
      "Microservicios para sugerencias de outfits. Estructura de back con recomendaciones y combinación de prendas. El código no es solo mío, por lo que no lo comparto.",
    tags: ["Spring", "Microservicios", "Vision AI"],
    media: [
      { type: "image", src: "/media/outfique-arch.png", alt: "Esquema de arquitectura backend" },
    ],
    github: null, // código privado/compartido
    demo: null,
    note: "Código privado del equipo; muestro esquema de arquitectura.",
  },
  {
    title: "Feria de Empleo · Landing y materiales",
    description:
      "Proyecto para una feria de empleo. Tengo vídeo demostrativo de la experiencia, sin acceso a código ni demo pública.",
    tags: ["Vite", "Tailwind", "Marketing"],
    media: [
      {
        type: "video",
        src: "/media/salon_de_ferias.mp4",
        poster: "/media/feria-poster.png",
        alt: "Vídeo de la feria de empleo",
      },
    ],
    github: null,
    demo: null,
    note: "Vídeo demostrativo (sin repo ni demo pública).",
  },
];

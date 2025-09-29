import Section from "./layout/Section";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { SKILLS_BY } from "../data/skills";

/**
 * Claves de los buckets de skills.
 *
 * @remarks
 * Se derivan de la estructura exportada por `SKILLS_BY`.
 *
 * @public
 */
type BucketKey = keyof typeof SKILLS_BY; // "frontend" | "backend" | "dataops" | "testing"

/**
 * Metadatos de presentación por bucket: título, descripción y tono del `<Badge>`.
 *
 * @internal
 */
const LABELS: Record<
    BucketKey,
    { title: string; desc: string; tone: Parameters<typeof Badge>[0]["tone"] }
> = {
    frontend: { title: "Frontend", desc: "UI, frameworks, estilos y tooling.", tone: "mint" },
    backend: { title: "Backend", desc: "APIs, servidores y lógica de negocio.", tone: "sand" },
    dataops: { title: "Data & DevOps", desc: "BBDD, despliegue y automatización.", tone: "coral" },
    testing: { title: "Testing", desc: "Unitario, integración, e2e y mocks.", tone: "secondary" },
};

/**
 * Color del acento lateral de cada card de skills.
 *
 * @param k - Bucket para el que se calcula el color.
 * @returns Un color CSS (string) basado en `color-mix` y los tokens del tema.
 *
 * @internal
 */
function sideAccentFor(k: BucketKey) {
    switch (k) {
        case "frontend":
            return "color-mix(in srgb, var(--soft-mint) 60%, white)";
        case "backend":
            return "color-mix(in srgb, var(--soft-sand) 60%, white)";
        case "dataops":
            return "color-mix(in srgb, var(--soft-coral) 60%, white)";
        case "testing":
            return "color-mix(in srgb, var(--secondary) 40%, white)";
    }
}

/**
 * Sección “Habilidades” agrupada en 4 buckets (2×2) con chips por tecnología.
 *
 * @remarks
 * - Orden fijo para simetría: `frontend`, `backend`, `dataops`, `testing`.
 * - Cada bucket muestra un acento lateral y sus skills en `Badge` con tonos de la paleta.
 * - Las listas de skills se ordenan alfabéticamente para escaneo rápido.
 *
 * @example
 * ```tsx
 * <Skills />
 * ```
 *
 * @see {@link SKILLS_BY} fuente de datos por bucket.
 * @see {@link Badge} chip visual para cada tecnología.
 * @see {@link Card} contenedor visual por bucket.
 *
 * @public
 */
export default function Skills() {
    // Orden fijo para el grid 2x2
    const ordered: BucketKey[] = ["frontend", "backend", "dataops", "testing"];

    // Copia ordenada alfabéticamente para lectura rápida
    const buckets = Object.fromEntries(
        ordered.map((k) => [k, [...SKILLS_BY[k]].sort((a, b) => a.localeCompare(b))])
    ) as Record<BucketKey, string[]>;

    return (
        <Section
            id="skills"
            title="Habilidades"
            subtitle="Tecnologías y prácticas que domino o uso a diario."
        >
            <div className="grid gap-6 md:grid-cols-2">
                {ordered.map((k) => (
                    <Card key={k} padding="lg" interactive aria-labelledby={`skills-${k}-title`}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 id={`skills-${k}-title`} className="text-lg font-semibold text-[var(--text)]">
                                    {LABELS[k].title}
                                </h3>
                                <p className="mt-1 text-sm text-[var(--text-muted)]">{LABELS[k].desc}</p>
                            </div>
                            <span
                                aria-hidden="true"
                                className="h-6 w-1.5 rounded-full"
                                style={{ background: sideAccentFor(k) }}
                            />
                        </div>

                        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${LABELS[k].title} skills`}>
                            {buckets[k].map((s) => (
                                <li key={s}>
                                    <Badge tone={LABELS[k].tone}>{s}</Badge>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </Section>
    );
}

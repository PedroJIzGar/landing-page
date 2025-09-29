// src/components/ui/CvButton.tsx
import { useState } from "react";
import { Download } from "lucide-react";

/**
 * Botón de CV:
 * - Si `href` es misma-origen (o ruta absoluta tipo "/cv.pdf"), intenta descargar el archivo.
 * - Si es externo, abre en una nueva pestaña de forma segura.
 */
export default function CvButton({
    href,
    filename = "CV.pdf",
    children = "CV",
}: {
    href: string;
    filename?: string;
    children?: React.ReactNode;
}) {
    const [loading, setLoading] = useState(false);

    const isSameOrigin = (() => {
        try {
            const u = new URL(href, window.location.origin);
            return u.origin === window.location.origin;
        } catch {
            return false;
        }
    })();

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // Si es externo: abrir en nueva pestaña
        if (!isSameOrigin) {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
        }

        // Mismo origen: intentamos descargar
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(href);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            if (import.meta.env.DEV) console.error("CV download failed:", err);
            window.open(href, "_blank", "noopener,noreferrer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Descargar o abrir CV"
            aria-busy={loading || undefined}
            className="group inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-semibold
                 text-[var(--on-primary)] bg-[var(--primary)] hover:bg-[var(--primary-700)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
                 shadow-sm hover:shadow transition-[background,box-shadow,transform] disabled:opacity-60"
            disabled={loading}
            title="Descargar CV"
        >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-[-1px]" />
            {loading ? "Preparando…" : children}
        </button>
    );
}

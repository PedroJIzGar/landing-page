# Landing Page – Portafolio (React + Vite + Tailwind v4)

Portafolio personal desarrollado con **React 19**, **Vite**, **Tailwind CSS v4** y **Framer Motion**.
Incluye una landing accesible, secciones de proyectos con carrusel (imágenes/vídeo), experiencia, skills, y formulario de contacto (demo).

> Paleta aplicada (WCAG-friendly):
> `--soft-mint: #7FC7AF` · `--soft-sand: #DAD8A7` · `--soft-coral: #FF9E9D` · `--secondary: #FF3D7F`
> Primarios/tonos derivados en `:root` de `src/index.css`.

---

## ✨ Características

* **UI responsive** y tipografía limpia.
* **Accesibilidad** (focus visible, contraste, landmarks, labels, aria-*).
* **Animaciones** sutiles (Framer Motion).
* **Carrusel accesible** para proyectos (teclado + indicadores).
* **Arquitectura clara**:

  * `components/layout` (`Section`)
  * `components/ui` (`Card`, `Badge`)
  * `components` por sección (`Header`, `Hero`, `Projects`, `Experience`, `Skills`, `Contact`, `Footer`)
  * `data/` (contenido estructurado)
  * `config/site.ts` (metadatos personales)
* **Documentación TSDoc/TypeDoc** (genera Markdown).

---

## 🧱 Stack

* **React 19**, **Vite 7**
* **Tailwind CSS v4** + variables CSS
* **Framer Motion**
* **Lucide Icons**
* **TypeScript**
* (Opcional) **TypeDoc** + `typedoc-plugin-markdown`

---

## 🚀 Empezar

```bash
# 1) Instalar dependencias
npm i

# 2) Desarrollo
npm run dev

# 3) Build producción
npm run build

# 4) Previsualizar build
npm run preview
```

### Scripts

| Script            | Descripción                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Arranca Vite en modo desarrollo    |
| `npm run build`   | Compila TypeScript y hace el build |
| `npm run preview` | Sirve la carpeta `dist/`           |
| `npm run lint`    | Lint con ESLint                    |
| `npm run docs`*   | Genera documentación con TypeDoc   |

* Requiere `typedoc.json` y dependencias instaladas (ver “Documentación”).

---

## 🗂️ Estructura

```
mi-portfolio/
├─ public/
│  └─ media/                # imágenes/vídeos para el carrusel de proyectos
├─ src/
│  ├─ components/
│  │  ├─ layout/Section.tsx
│  │  ├─ ui/Badge.tsx
│  │  ├─ ui/Card.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx
│  │  ├─ Experience.tsx
│  │  ├─ Skills.tsx
│  │  └─ Contact.tsx
│  ├─ config/site.ts        # datos personales / enlaces
│  ├─ data/experience.ts    # timeline
│  ├─ data/projects.ts      # tarjetas + carrusel (image/video)
│  ├─ data/skills.ts        # buckets de skills
│  ├─ index.css             # variables de color + resets
│  ├─ main.tsx
│  └─ App.tsx
├─ tailwind.config.js
├─ postcss.config.js
├─ typedoc.json             # (opcional) config de documentación
├─ tsconfig*.json
└─ vite.config.ts
```

---

## 🎨 Colores & Accesibilidad

* Variables en `src/index.css` (sección `:root`).
* Componentes UI usan `var(--text)`, `var(--text-muted)`, `var(--surface)`, `var(--border)`, `var(--primary)`, etc.
* Los *badges* y *chips* usan `color-mix()` para asegurar contraste sin “gritar”.

Checklist A11y (parcial):

* `aria-label`, `aria-current`, `aria-controls` según corresponde.
* Focus `:focus-visible` en enlaces/botones y controles del carrusel.
* Alternativas de texto (`alt`) en imágenes.
* Estructura semántica: headings ordenados y landmarks (`header`, `section`, `footer`).

---

## 🖼️ Proyectos y Media

* Las rutas del carrusel en `src/data/projects.ts`.
* Coloca los ficheros en `public/media/` y referencia con `/media/...`:

  ```ts
  media: [
    { type: "image", src: "/media/timelogic-1.jpg", alt: "Dashboard" },
    { type: "video", src: "/media/feria.mp4", poster: "/media/feria-poster.png" }
  ]
  ```
* Si usas archivos grandes (vídeo), considera **Git LFS**:

  ```bash
  git lfs install
  git lfs track "*.mp4" "*.mov" "*.webm" "*.png" "*.jpg"
  git add .gitattributes
  git commit -m "chore: track media with Git LFS"
  ```

---

## 🧾 Documentación (TypeDoc)

1. Dependencias (ya en `devDependencies` del `package.json`):

```
typedoc
typedoc-plugin-markdown
```

2. Script en `package.json`:

```json
"scripts": {
  "docs": "typedoc"
}
```

3. `typedoc.json` ejemplo:

```json
{
  "entryPoints": ["src"],
  "tsconfig": "tsconfig.app.json",
  "plugin": ["typedoc-plugin-markdown"],
  "out": "docs",
  "cleanOutputDir": true,
  "hideBreadcrumbs": true,
  "hideInPageTOC": true
}
```

4. Generar:

```bash
npm run docs
```

La documentación se emitirá en `./docs/` (Markdown), útil para un wiki o GitHub Pages.

---

## 📦 Despliegue

* **Vercel**: Importa el repo → Framework “Vite” → `Build Command: npm run build` → `Output: dist`.
* **Netlify**: `Build: npm run build` · `Publish: dist/`.
* **GitHub Pages** (estático):

  ```bash
  # una opción: publicar /dist con gh-pages
  npm i -D gh-pages
  # package.json
  # "homepage": "https://<usuario>.github.io/<repo>",
  # "scripts": { "predeploy":"npm run build", "deploy":"gh-pages -d dist" }
  npm run deploy
  ```

---

## 🔧 Configuración rápida

* Actualiza tus datos en `src/config/site.ts`.
* Añade/edita proyectos en `src/data/projects.ts` (tags, media, notas).
* Ajusta la paleta en `src/index.css` si lo necesitas.

---

## 📝 Licencia

Este proyecto está bajo licencia **MIT**. Puedes usarlo como base para tu propio portafolio.

---

## 🙌 Créditos

* Iconos: [Lucide](https://lucide.dev/)
* Animaciones: [Framer Motion](https://www.framer.com/motion/)
* Estilos: [Tailwind CSS](https://tailwindcss.com/)

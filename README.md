# LANDING-PAGE

<p align="center">
  <!-- status / meta badges -->
  <img alt="last commit" src="https://img.shields.io/badge/last%20commit-today-2ea44f?style=for-the-badge" />
  <img alt="typescript" src="https://img.shields.io/badge/typescript-95%25-blue?style=for-the-badge" />
  <img alt="languages" src="https://img.shields.io/badge/languages-4-999?style=for-the-badge" />
</p>

<p align="center">
  <!-- tech badges (stack moved up here) -->
  <img alt="React" src="https://img.shields.io/badge/React-18/19-61dafb?logo=react&logoColor=000&style=for-the-badge" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=fff&style=for-the-badge" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind%20CSS-v4-06b6d4?logo=tailwindcss&logoColor=fff&style=for-the-badge" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=fff&style=for-the-badge" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-12-0055ff?logo=framer&logoColor=fff&style=for-the-badge" />
  <img alt="Lucide" src="https://img.shields.io/badge/Lucide%20Icons-%20-18181b?logo=lucid&style=for-the-badge" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-9-4b32c3?logo=eslint&logoColor=fff&style=for-the-badge" />
  <img alt="PostCSS" src="https://img.shields.io/badge/PostCSS-8-dd3a0a?logo=postcss&logoColor=fff&style=for-the-badge" />
</p>

Paleta aplicada (**WCAG-friendly**):
`--soft-mint: #7FC7AF` · `--soft-sand: #DAD8A7` · `--soft-coral: #FF9E9D` · `--secondary: #FF3D7F`.
Primarios/tonos derivados en `:root` de `src/index.css`.

---

## ✨ Características

* **UI responsive** y tipografía limpia.
* **Accesibilidad** (focus visible, contraste, landmarks, labels, `aria-*`).
* **Animaciones** sutiles (Framer Motion).
* **Carrusel accesible** para proyectos (teclado + indicadores + vídeo).
* **Arquitectura clara**:

  * `components/layout` (`Section`)
  * `components/ui` (`Card`, `Badge`)
  * secciones: `Header`, `Hero`, `Projects`, `Experience`, `Skills`, `Contact`, `Footer`
  * `data/` (contenido)
  * `config/site.ts` (metadatos personales)
* **Documentación TSDoc/TypeDoc** (Markdown).

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

* Requiere `typedoc.json` y dependencias instaladas (ver **Documentación**).

---

## 🗂️ Estructura

```
mi-portfolio/
├─ public/
│  └─ media/                # imágenes/vídeos del carrusel de proyectos
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
* Los *badges* y *chips* usan `color-mix()` para buen contraste sin “gritar”.

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

1. Añade dependencias (si no las tienes ya):

```bash
npm i -D typedoc typedoc-plugin-markdown
```

2. Script en `package.json`:

```json
{
  "scripts": { "docs": "typedoc" }
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

La documentación se emitirá en `./docs/` (Markdown).

---

## 📦 Despliegue

* **Vercel**: Importa el repo → Framework “Vite” → `Build: npm run build` → `Output: dist`.
* **Netlify**: `Build: npm run build` · `Publish: dist/`.
* **GitHub Pages**:

```bash
npm i -D gh-pages
# package.json
# "homepage": "https://<usuario>.github.io/<repo>",
# "scripts": { "predeploy": "npm run build", "deploy": "gh-pages -d dist" }
npm run deploy
```

---

## 🔧 Configuración rápida

* Actualiza tus datos en `src/config/site.ts`.
* Añade/edita proyectos en `src/data/projects.ts` (tags, media, notas).
* Ajusta la paleta en `src/index.css`.

---

## 📝 Licencia

Este proyecto está bajo licencia **MIT**. Puedes usarlo como base para tu portafolio.

---

## 🙌 Créditos

* Iconos: [Lucide](https://lucide.dev/)
* Animaciones: [Framer Motion](https://www.framer.com/motion/)
* Estilos: [Tailwind CSS](https://tailwindcss.com/)

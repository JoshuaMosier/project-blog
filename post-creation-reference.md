# 📄 New Project Post Reference

> _The quick-start guide to adding a new project post to the **project-blog** codebase._
> 
> This doc focuses on **file creation only**—no commands, no terminal steps. Follow it and the site will automatically recognise the new content the next time it builds.

---

## 1. Choose a **slug**

* A short, URL-friendly name, e.g. `my-cool-project`.
* It drives **all** file & folder names as well as the public URL `/posts/my-cool-project`.

---

## 2. Drop your static assets

```
static/
└── posts/
    └── <slug>/           # folder you create
        ├── hero.jpg      # first image (used in front-matter)
        ├── shot_1.jpg
        ├── demo.mp4
        └── …
```

Everything inside `static/` is served verbatim, so use web-ready sizes (optionally run `scripts/optimizePhotos.py` locally before committing).

---

## 3. Create the markdown file

Copy the template:

```
src/templates/post-template.md  →  src/posts/<slug>.md
```

and adjust as follows:

### Front-matter
```yaml
---
title: "🚀 Awesome Project Title"       # required
date: 2025-01-20                         # ISO (YYYY-MM-DD); noon EST assumed
image: ./hero.jpg                       # relative to static/posts/<slug>/
categories: ["programming"]            # keys must exist in config.js
---
```
* `title`, `date`, `image` and `categories` are essential.
* Valid categories live in `src/lib/config.js` (default: `programming`, `3d-printing`, `electronics`). Add new keys there **before** using them.

### Body content

* Write in regular Markdown.
* mdsvex lets you embed Svelte components inline.
* Images: use absolute paths so the build can resolve them:
  ```markdown
  ![alt text](/posts/<slug>/shot_1.jpg)
  ```
* To disable the automatic lightbox on an image, add `class="no-lightbox"` or wrap it in your own component.

---

## 4. Optional Svelte components

Need interactive media? Import components at the top of your markdown:

```svelte
<script>
  import ImageCarousel from '$lib/components/ImageCarousel.svelte';
  const items = [
    { src: '/posts/<slug>/shot_1.jpg', alt: 'First', type: 'image' },
    { src: '/posts/<slug>/demo.mp4',   alt: 'Demo',  type: 'video' }
  ];
</script>

<ImageCarousel {items}>
  <img src={items[0].src} alt={items[0].alt} />
</ImageCarousel>
```

Other available components:

| Component | Purpose |
|-----------|---------|
| `Lightbox.svelte`      | Manual lightbox wrapper (auto-applied to images by default) |
| `ImageCarousel.svelte` | Mixed image/video gallery |
| `GlbViewer.svelte` / `ObjViewer.svelte` | 3-D model embeds |
| `PlotlyChart.svelte`   | Interactive charts |

---

## 5. Content checklist

- [ ] **Slug** chosen & consistent
- [ ] Markdown saved at `src/posts/<slug>.md`
- [ ] Front-matter fields complete & valid
- [ ] Hero image exists in `static/posts/<slug>/`
- [ ] Categories match those in `config.js`
- [ ] All media paths start with `/posts/<slug>/`
- [ ] Alt text on every image/video
- [ ] (Optional) Imported components compile in markdown
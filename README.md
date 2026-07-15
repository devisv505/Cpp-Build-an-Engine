# Learn C++ & DirectX — Build Your Own Game Engine

A free, self-paced, **offline-first** course website that teaches C++ from absolute zero and
guides the learner all the way to building their own component-based 3D engine with **DirectX 11** —
using the same architectural ideas as Unity and Unreal.

It's plain **HTML + CSS + JavaScript**. No build step, no dependencies, no server required.

## Running it

Just open `index.html` in any modern browser (double-click it, or drag it into a browser tab).
Everything works from the local filesystem. Progress is saved in the browser's `localStorage`.

> Tip: some browsers restrict a few features on `file://` pages. For the smoothest experience you can
> optionally serve the folder with any static server, e.g. `python -m http.server` and open
> `http://localhost:8000`.

## What's inside

| Path | Purpose |
|------|---------|
| `index.html` | Landing page — hero, module roadmap, the "build MiniEngine" project panel, "continue where you left off". |
| `tasks.html` | **Engine Build Tracker** — all 68 build tasks as an interactive checklist grouped by module, with a progress ring. |
| `css/styles.css` | The entire design system (dark/light themes, all components). |
| `js/curriculum.js` | **Single source of truth** for every module and lesson (order, titles, paths). |
| `js/tasks.js` | The 68 cumulative engine-build tasks (one per lesson). |
| `js/main.js` | Builds all shared chrome: header, sidebar, table of contents, prev/next, lesson-completion + build-task boxes, progress tracking, code highlighting, theme toggle. |
| `lessons/<module>/<slug>.html` | One file per lesson. Each contains only its `<article>` content. |

## The project: build "MiniEngine"

The course is **project-based**. Every lesson ends with one hands-on **build task**, injected
automatically from `js/tasks.js`. Done in order, the 68 tasks stack into a small, Unity/Unreal-style
DirectX 11 engine — from opening a Win32 window and a game loop, through Direct3D 11 rendering, to a
GameObject–Component scene system, ending in a spinning textured cube rendered by the learner's own
engine. The [Engine Build Tracker](tasks.html) aggregates every task with checkboxes and progress
(saved in `localStorage` under `cppdx-tasks`, shared with each lesson's task box).

## The curriculum (10 modules, 76 lessons)

0. **Getting Started** — tools, how C++ compiles, first program.
1. **C++ Fundamentals** — variables, control flow, functions.
2. **Data & Memory** — arrays, pointers, the heap.
3. **Object-Oriented C++** — classes, inheritance, polymorphism, templates, smart pointers.
4. **Math for Graphics** — vectors, matrices, DirectXMath.
5. **Windows & the Game Loop** — Win32 window, message loop, delta time.
6. **DirectX 11 Foundations** — from device init to textured, depth-tested 3D.
7. **Engine Architecture** — GameObjects, Actors, ECS, scenes, subsystems.
8. **Build Your Engine** — assemble it all into a working engine, including a Unity-style MonoBehaviour scripting class.
9. **Multiplayer & Networking** — Winsock sockets, TCP/UDP, serialization, the client-server model, and replicating GameObjects online.

## How the pages fit together

Each lesson page is intentionally minimal — it supplies **only** the `<article>` content:

```html
<body class="lesson-page">
  <div id="app">
    <main class="content">
      <article class="lesson">
        <h1>…</h1>
        <p class="lead">…</p>
        <div class="objectives">…</div>
        <!-- teaching sections -->
        <div class="recap">…</div>
      </article>
    </main>
  </div>
  <script src="../../js/curriculum.js"></script>
  <script src="../../js/main.js"></script>
</body>
```

At load time, `main.js` reads `curriculum.js` and injects the header, sidebar (with the current
lesson highlighted), breadcrumb, the "Lesson N of 68" eyebrow, a reading-time estimate, the
"On this page" table of contents, syntax-highlighted code blocks with copy buttons, the
prev/next pager, and the "Mark as complete" button. **You never hand-write those** — they stay
consistent everywhere because they come from one place.

## Adding or reordering lessons

1. Add or move an entry in `js/curriculum.js` (its `dir` + `slug` define the file path and its
   position sets the numbering and prev/next links).
2. Create the matching `lessons/<dir>/<slug>.html` file using the structure above.

That's it — the sidebar, roadmap, progress bar and navigation update automatically.

## Content components available in a lesson

`objectives` box · four `callout` styles (note / tip / warn / danger) · fenced code blocks with a
`language-*` class (`cpp`, `hlsl`, `powershell`, `console`, `text`, `cmake`) · `table` wrapped in
`.table-wrap` · `figure` / `.figure-box` for inline SVG diagrams · `kbd` keys · `recap` box.

Inside code blocks, `<`, `>` and `&` must be HTML-escaped (`&lt;`, `&gt;`, `&amp;`).

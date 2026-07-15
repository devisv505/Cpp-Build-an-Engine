# Learn C++ — Build Your Own Cross-Platform Game Engine

A free, self-contained course that starts at absolute zero and guides the learner to a component-based 3D engine. The course uses **CLion and CMake** throughout, with **Direct3D 11 on Windows** and **Metal on macOS**. Shared engine, gameplay, networking, windowing, and math concepts remain portable.

## Run the course

No web build step is required. Open `index.html` in a browser, or serve the repository with any static file server.

Course progress and build-task completion are stored in the browser's local storage.

## Learning path

The course contains 76 lessons in 10 modules:

1. **Getting Started** — CLion, CMake, the compiler/linker pipeline, first program, and debugging.
2. **C++ Fundamentals** — variables, control flow, functions, scope, and lifetime.
3. **Data & Memory** — arrays, strings, pointers, references, allocation, and multiple files.
4. **Object-Oriented C++** — classes, RAII, polymorphism, templates, smart pointers, and the STL.
5. **Math for Graphics** — coordinate systems, vectors, matrices, DirectXMath, and Apple `simd`.
6. **Platform & the Game Loop** — GLFW windows, events, input, delta time, Windows, and macOS.
7. **Graphics Foundations** — the shared GPU pipeline, Direct3D 11, Metal, shaders, buffers, textures, depth, and cameras.
8. **Engine Architecture** — subsystems, GameObjects, Actors, ECS, scene graphs, resources, input, and time.
9. **Build Your Engine** — portable CMake targets, renderer backends, components, scripting, materials, and the complete loop.
10. **Multiplayer & Networking** — portable sockets, TCP/UDP, serialization, client-server design, and replication.

## Platform toolchains

| Platform | IDE | Compiler/toolchain | Windowing | Graphics |
|---|---|---|---|---|
| Windows | CLion | Bundled MinGW | GLFW | Direct3D 11 + HLSL |
| macOS | CLion | Apple Clang | GLFW/Cocoa | Metal + Metal Shading Language |

Platform-specific implementation stays behind CMake's `WIN32` and `APPLE` branches. Public engine interfaces use standard C++ and GLFW types where appropriate.

## Project structure

- `index.html` — landing page and roadmap.
- `tasks.html` — one cumulative engine task per lesson.
- `js/curriculum.js` — the source of truth for ordering, paths, and navigation.
- `js/tasks.js` — the course build tasks.
- `js/main.js` — shared page chrome, navigation, progress, search, and code blocks.
- `lessons/` — the 76 lesson pages.
- `css/styles.css` — shared presentation.

## Adding or reordering lessons

1. Add or move an entry in `js/curriculum.js`. Its `dir` and `slug` define the file path.
2. Create the matching `lessons/<dir>/<slug>.html` page.
3. Add a task in `js/tasks.js` whose id matches `<module>-<slug>`.

The sidebar, roadmap, progress bar, lesson numbering, and previous/next links are generated automatically.

## Lesson components

Lessons may use objectives, callouts, code blocks, wrapped tables, inline SVG figures, keyboard keys, and recap boxes. Code blocks use language classes such as `cpp`, `hlsl`, `shader`, `cmake`, `console`, and `text`. Inside code blocks, `<`, `>`, and `&` must be HTML-escaped.

/* =====================================================================
   Curriculum — the single source of truth for navigation & ordering.
   main.js builds the sidebar, TOC, prev/next and progress from this.
   Paths are relative to the site root.
   ===================================================================== */
window.CURRICULUM = [
  {
    num: "00",
    title: "Getting Started",
    tag: "Setup & tools",
    blurb: "Install everything, understand how C++ becomes a running program, and ship your first build.",
    dir: "lessons/00-getting-started",
    lessons: [
      { slug: "what-is-cpp",         title: "What Is C++ & Why Build Engines With It" },
      { slug: "how-cpp-works",       title: "How C++ Works: Compiler, Linker & Binary" },
      { slug: "install-clion",         title: "Installing CLion & the C++ Tools" },
      { slug: "first-program",       title: "Your First Program: Hello, World" },
      { slug: "build-run-debug",     title: "Building, Running & Debugging" },
      { slug: "project-anatomy",     title: "Anatomy of a C++ Project" }
    ]
  },
  {
    num: "01",
    title: "C++ Fundamentals",
    tag: "Core language",
    blurb: "Variables, control flow and functions — the grammar you will use in every line of engine code.",
    dir: "lessons/01-cpp-fundamentals",
    lessons: [
      { slug: "variables-types",  title: "Variables & Fundamental Types" },
      { slug: "constants-io",     title: "Constants & Console I/O" },
      { slug: "operators",        title: "Operators & Expressions" },
      { slug: "conditionals",     title: "Decisions: if, else & switch" },
      { slug: "loops",            title: "Loops: while, do-while & for" },
      { slug: "functions",        title: "Functions: Reusing Your Code" },
      { slug: "scope-lifetime",   title: "Scope, Lifetime & the Stack" }
    ]
  },
  {
    num: "02",
    title: "Data & Memory",
    tag: "Pointers & structures",
    blurb: "Arrays, references, pointers and the heap — how a program actually stores and moves data.",
    dir: "lessons/02-data-and-memory",
    lessons: [
      { slug: "arrays-vectors",   title: "Arrays & std::vector" },
      { slug: "strings",          title: "Text: std::string" },
      { slug: "references",       title: "References" },
      { slug: "pointers",         title: "Pointers & Memory Addresses" },
      { slug: "dynamic-memory",   title: "Dynamic Memory: new, delete & the Heap" },
      { slug: "structs-enums",    title: "Structs & Enums: Grouping Data" },
      { slug: "multiple-files",   title: "Headers, Source Files & the Preprocessor" }
    ]
  },
  {
    num: "03",
    title: "Object-Oriented C++",
    tag: "Classes & abstraction",
    blurb: "Classes, inheritance, polymorphism, templates and smart pointers — the toolkit engines are built from.",
    dir: "lessons/03-object-oriented",
    lessons: [
      { slug: "classes",              title: "Classes & Objects" },
      { slug: "constructors-raii",    title: "Constructors, Destructors & RAII" },
      { slug: "encapsulation",        title: "Encapsulation, const & Access" },
      { slug: "inheritance",          title: "Inheritance" },
      { slug: "polymorphism",         title: "Virtual Functions & Polymorphism" },
      { slug: "operator-overloading", title: "Operator Overloading" },
      { slug: "templates",            title: "Templates & Generic Programming" },
      { slug: "smart-pointers",       title: "Smart Pointers & Modern Memory" },
      { slug: "stl",                  title: "The Standard Template Library" }
    ]
  },
  {
    num: "04",
    title: "Math for Graphics",
    tag: "Vectors & matrices",
    blurb: "The 3D math every renderer runs on: coordinate spaces, vectors, matrices and SIMD math on Windows and macOS.",
    dir: "lessons/04-math",
    lessons: [
      { slug: "coordinate-systems", title: "Coordinate Systems & Spaces" },
      { slug: "vectors",            title: "Vectors: the Language of 3D" },
      { slug: "dot-cross",          title: "Dot & Cross Products" },
      { slug: "matrices",           title: "Matrices & Transformations" },
      { slug: "simd-math",          title: "SIMD Math: DirectXMath & Apple simd" }
    ]
  },
  {
    num: "05",
    title: "Platform & the Game Loop",
    tag: "GLFW & timing",
    blurb: "Open a portable GLFW window, process events and input, and drive everything from a real-time game loop.",
    dir: "lessons/05-platform-game-loop",
    lessons: [
      { slug: "platform-window", title: "Creating a Window on Windows & macOS" },
      { slug: "message-loop",    title: "Events & Input with GLFW" },
      { slug: "game-loop",    title: "The Game Loop & Delta Time" }
    ]
  },
  {
    num: "06",
    title: "Graphics Foundations",
    tag: "Real-time rendering",
    blurb: "Build textured, depth-tested 3D with Direct3D 11 on Windows and Metal on macOS.",
    dir: "lessons/06-graphics-foundations",
    lessons: [
      { slug: "graphics-pipeline",   title: "The Graphics Pipeline Explained" },
      { slug: "graphics-init",        title: "Initializing Direct3D 11 & Metal" },
      { slug: "clear-screen",        title: "Render Targets: Clearing the Screen" },
      { slug: "first-triangle",      title: "Your First Triangle" },
      { slug: "shaders",             title: "Shaders: HLSL & Metal Shading Language" },
      { slug: "input-layouts",       title: "Input Layouts & Vertex Formats" },
      { slug: "constant-buffers",    title: "Constant Buffers" },
      { slug: "transformations-mvp", title: "Model, View & Projection" },
      { slug: "index-buffers",       title: "Index Buffers & Drawing a Cube" },
      { slug: "depth-buffer",        title: "The Depth Buffer & Culling" },
      { slug: "textures",            title: "Textures & Sampling" },
      { slug: "camera",              title: "A Movable Camera" }
    ]
  },
  {
    num: "07",
    title: "Engine Architecture",
    tag: "Unity & Unreal logic",
    blurb: "How real engines are organized: subsystems, GameObjects, Actors, ECS, scene graphs and services.",
    dir: "lessons/07-engine-architecture",
    lessons: [
      { slug: "what-is-an-engine",   title: "What a Game Engine Actually Is" },
      { slug: "engine-subsystems",   title: "Subsystems & the Main Loop" },
      { slug: "gameobject-component", title: "The GameObject–Component Model (Unity)" },
      { slug: "actor-component",     title: "The Actor Model (Unreal)" },
      { slug: "ecs",                 title: "Entity-Component-System" },
      { slug: "scene-graph",         title: "Scenes, Transforms & Hierarchy" },
      { slug: "resource-management", title: "Assets & Resource Management" },
      { slug: "input-time-systems",  title: "Input & Time as Engine Services" }
    ]
  },
  {
    num: "08",
    title: "Build Your Engine",
    tag: "Capstone project",
    blurb: "Assemble everything into a component-based engine with portable systems and native Windows/macOS renderers.",
    dir: "lessons/08-build-engine",
    lessons: [
      { slug: "project-setup",        title: "Structuring the Engine Project" },
      { slug: "application-window",   title: "The Application & Window Classes" },
      { slug: "renderer-abstraction", title: "Abstracting the Renderer" },
      { slug: "math-library",         title: "Building a Small Math Library" },
      { slug: "mesh-model",           title: "Meshes & Loading Models" },
      { slug: "material-system",      title: "A Material & Shader System" },
      { slug: "transform-component",  title: "The Transform Component & Hierarchy" },
      { slug: "gameobject-system",    title: "GameObjects & Components" },
      { slug: "behaviour-scripting",  title: "Scripting with a MonoBehaviour-Style Class" },
      { slug: "camera-component",     title: "The Camera Component" },
      { slug: "engine-loop",          title: "Tying It Together: the Engine Loop" },
      { slug: "where-next",           title: "Where to Go Next" }
    ]
  },
  {
    num: "09",
    title: "Multiplayer & Networking",
    tag: "Sockets & replication",
    blurb: "Take your engine online: sockets in C++, TCP vs UDP, serializing game state, and the client-server model that powers real multiplayer.",
    dir: "lessons/09-multiplayer-networking",
    lessons: [
      { slug: "networking-basics",     title: "Networking Fundamentals for Games" },
      { slug: "sockets-setup",         title: "Sockets on Windows & macOS" },
      { slug: "tcp-client-server",     title: "A Portable TCP Client & Server" },
      { slug: "udp-datagrams",         title: "Portable UDP Datagrams" },
      { slug: "serialization",         title: "Serializing Game State" },
      { slug: "game-networking-model", title: "The Client-Server Game Model" },
      { slug: "engine-networking",     title: "Networking MiniEngine" }
    ]
  },
  {
    num: "10",
    title: "Shaders & Post-Processing",
    tag: "Textures, HDR & bloom",
    blurb: "Push past flat color: master texture sampling, render into off-screen targets, and build a real HDR bloom pipeline you can drop into any scene.",
    dir: "lessons/10-shaders-postfx",
    lessons: [
      { slug: "texture-filtering-mips", title: "Textures In Depth: Filtering, Mipmaps & sRGB" },
      { slug: "atlases-and-arrays",     title: "Texture Atlases & Texture Arrays" },
      { slug: "render-targets",         title: "Render Targets: Drawing Into a Texture" },
      { slug: "fullscreen-pass",        title: "The Fullscreen Post-Process Pass" },
      { slug: "hdr-tonemapping",        title: "HDR Color & Tone Mapping" },
      { slug: "gaussian-blur",          title: "Separable Gaussian Blur" },
      { slug: "bloom",                  title: "Bloom: Making Bright Things Glow" },
      { slug: "post-pipeline",          title: "A Composable Post Stack & Engine Integration" }
    ]
  },
  {
    num: "11",
    title: "Build Minecraft: A Voxel Engine",
    tag: "Voxels, chunks & fast algorithms",
    blurb: "Turn your engine into a Minecraft-style sandbox: chunked worlds, greedy meshing, procedural terrain with trees and foliage, flood-fill light, fast voxel raycasting, and a threaded job system.",
    dir: "lessons/11-voxel-minecraft",
    lessons: [
      { slug: "voxels-and-chunks",    title: "Voxels, Chunks & World Coordinates" },
      { slug: "block-registry",       title: "Blocks, IDs & a Data-Oriented Registry" },
      { slug: "naive-meshing",        title: "From Voxels to Triangles: Naïve Meshing" },
      { slug: "hidden-face-removal",  title: "Hidden Face Removal" },
      { slug: "greedy-meshing",       title: "Greedy Meshing" },
      { slug: "voxel-texturing",      title: "Texturing Voxels with an Atlas" },
      { slug: "ambient-occlusion",    title: "Voxel Ambient Occlusion" },
      { slug: "terrain-generation",   title: "Procedural Terrain with Noise" },
      { slug: "trees-and-decoration", title: "Trees, Grass & World Decoration" },
      { slug: "flood-fill-lighting",  title: "Flood-Fill Lighting" },
      { slug: "chunk-streaming",      title: "Infinite Worlds: Chunk Streaming & LOD" },
      { slug: "job-system",           title: "A Job System: Meshing Off the Main Thread" },
      { slug: "voxel-raycasting",     title: "Block Picking with Voxel Raycasting (DDA)" },
      { slug: "frustum-culling",      title: "Frustum Culling & Draw-Call Batching" },
      { slug: "water-transparency",   title: "Water, Transparency & Glow" },
      { slug: "capstone-voxel",       title: "Capstone: Your Voxel Sandbox" }
    ]
  }
];

/* Flatten into an ordered list with global numbers + resolved hrefs. */
(function () {
  var flat = [];
  var n = 0;
  window.CURRICULUM.forEach(function (mod) {
    mod.lessons.forEach(function (ls) {
      n++;
      ls.n = n;
      ls.module = mod.num;
      ls.moduleTitle = mod.title;
      ls.href = mod.dir + "/" + ls.slug + ".html";
      ls.id = mod.num + "-" + ls.slug;
      flat.push(ls);
    });
  });
  window.LESSONS_FLAT = flat;
  window.LESSON_TOTAL = n;
})();

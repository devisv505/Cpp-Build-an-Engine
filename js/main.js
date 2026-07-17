/* =====================================================================
   main.js — builds all shared chrome from curriculum.js so every
   lesson page only needs to supply its <article> content.
   Handles: header, sidebar, progress, TOC, prev/next, theme,
   code enhancement (headers + copy), and C++/shader syntax highlighting.
   ===================================================================== */
(function () {
  "use strict";

  var PROGRESS_KEY = "cppdx-progress";
  var THEME_KEY = "cppdx-theme";

  /* ---- Root-relative path (works from index or nested lessons) ------- */
  function rootPrefix() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      var idx = src.indexOf("js/main.js");
      if (idx !== -1) return src.slice(0, idx);
    }
    return "";
  }
  var ROOT = rootPrefix();

  /* ---- Progress store ----------------------------------------------- */
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function setDone(id, done) {
    var p = getProgress();
    if (done) p[id] = true; else delete p[id];
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch (e) {}
  }

  /* ---- Task progress store ------------------------------------------ */
  var TASKS_KEY = "cppdx-tasks";
  function getTasksDone() {
    try { return JSON.parse(localStorage.getItem(TASKS_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function setTaskDone(id, done) {
    var t = getTasksDone();
    if (done) t[id] = true; else delete t[id];
    try { localStorage.setItem(TASKS_KEY, JSON.stringify(t)); } catch (e) {}
  }

  /* ---- Identify current lesson from the URL ------------------------- */
  function currentLesson() {
    var parts = decodeURIComponent(location.pathname).split("/").filter(Boolean);
    var tail = parts.slice(-2).join("/");
    for (var i = 0; i < window.LESSONS_FLAT.length; i++) {
      if (window.LESSONS_FLAT[i].href.indexOf(tail) !== -1 && tail) return window.LESSONS_FLAT[i];
    }
    return null;
  }

  /* ---- SVG icon helpers --------------------------------------------- */
  var ICON = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>'
  };

  /* ---- Theme --------------------------------------------------------- */
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    var next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    updateThemeBtn();
  }
  function updateThemeBtn() {
    var btn = document.getElementById("theme-btn");
    if (!btn) return;
    var light = document.documentElement.getAttribute("data-theme") === "light";
    btn.innerHTML = light ? ICON.moon : ICON.sun;
    btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  }

  /* ---- Header -------------------------------------------------------- */
  function buildHeader(isLesson) {
    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      (isLesson ? '<button class="icon-btn menu-toggle" id="menu-btn" aria-label="Menu">' + ICON.menu + '</button>' : '') +
      '<a class="brand" href="' + ROOT + 'index.html">' +
        '<span class="logo">C++</span>' +
        '<span>Learn C++ <span class="brand-sub">· Build a Cross-Platform Engine</span></span>' +
      '</a>' +
      '<div class="header-spacer"></div>' +
      '<div class="header-actions">' +
        '<a class="track-link" href="' + ROOT + 'tasks.html" title="Engine Build Tracker">' +
          ICON.list + '<span class="tl-txt">Build Tracker</span></a>' +
        '<button class="icon-btn" id="theme-btn" aria-label="Toggle theme"></button>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);
    document.getElementById("theme-btn").addEventListener("click", toggleTheme);
    updateThemeBtn();
    var mb = document.getElementById("menu-btn");
    if (mb) mb.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
  }

  /* ---- Sidebar ------------------------------------------------------- */
  function buildSidebar(current) {
    var progress = getProgress();
    var aside = document.createElement("aside");
    aside.className = "sidebar";
    aside.id = "sidebar";

    var html = '<div class="side-progress">' +
        '<div class="bar"><span id="prog-bar"></span></div>' +
        '<div class="label"><span id="prog-count">0 / ' + window.LESSON_TOTAL + '</span><span id="prog-pct">0%</span></div>' +
      '</div>' +
      '<input type="text" id="lesson-search" placeholder="Filter lessons…" ' +
        'style="width:calc(100% - 24px);margin:0 12px 12px;padding:8px 12px;background:var(--bg-inset);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:inherit;font-size:13px;">';

    window.CURRICULUM.forEach(function (mod) {
      var isCurrentMod = current && current.module === mod.num;
      html += '<div class="mod' + (isCurrentMod ? "" : " collapsed") + '" data-mod="' + mod.num + '">';
      html += '<button class="mod-head"><span class="mod-num">' + mod.num + '</span>' +
              '<span>' + mod.title + '</span><span class="chev">' + ICON.chev + '</span></button>';
      html += '<div class="mod-links">';
      mod.lessons.forEach(function (ls, i) {
        var id = mod.num + "-" + ls.slug;
        var done = !!progress[id];
        var active = current && current.id === id;
        var n = mod.num + "." + (i + 1);
        html += '<a class="lesson-link' + (active ? " active" : "") + (done ? " done" : "") +
                '" href="' + ROOT + mod.dir + "/" + ls.slug + '.html" data-id="' + id + '" data-title="' + ls.title.toLowerCase() + '">' +
                '<span class="dot">' + ICON.check + '</span>' +
                '<span class="num">' + n + '</span>&nbsp;<span class="lt">' + ls.title + '</span></a>';
      });
      html += '</div></div>';
    });

    aside.innerHTML = html;
    // Sidebar is position:fixed, so DOM order is irrelevant — append to body
    // (the .content element is nested inside #app, not a direct child of body).
    document.body.appendChild(aside);

    var backdrop = document.createElement("div");
    backdrop.className = "backdrop";
    backdrop.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    document.body.appendChild(backdrop);

    // collapse toggles
    aside.querySelectorAll(".mod-head").forEach(function (h) {
      h.addEventListener("click", function () { h.parentNode.classList.toggle("collapsed"); });
    });

    // search filter
    var search = document.getElementById("lesson-search");
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      aside.querySelectorAll(".mod").forEach(function (m) {
        var any = false;
        m.querySelectorAll(".lesson-link").forEach(function (a) {
          var match = !q || a.getAttribute("data-title").indexOf(q) !== -1;
          a.style.display = match ? "" : "none";
          if (match) any = true;
        });
        m.style.display = any ? "" : "none";
        if (q) m.classList.remove("collapsed");
      });
    });

    updateProgressUI();
  }

  function updateProgressUI() {
    var p = getProgress();
    var done = 0;
    window.LESSONS_FLAT.forEach(function (l) { if (p[l.id]) done++; });
    var pct = Math.round((done / window.LESSON_TOTAL) * 100);
    var bar = document.getElementById("prog-bar");
    var cnt = document.getElementById("prog-count");
    var pctEl = document.getElementById("prog-pct");
    if (bar) bar.style.width = pct + "%";
    if (cnt) cnt.textContent = done + " / " + window.LESSON_TOTAL;
    if (pctEl) pctEl.textContent = pct + "%";
  }

  /* ---- Breadcrumb + eyebrow + meta ---------------------------------- */
  function buildLessonHeader(article, current) {
    var readMin = Math.max(1, Math.round(article.textContent.trim().split(/\s+/).length / 190));

    var crumb = document.createElement("nav");
    crumb.className = "breadcrumb";
    crumb.innerHTML =
      '<a href="' + ROOT + 'index.html">Home</a><span class="sep">/</span>' +
      '<span>Module ' + current.module + ' · ' + current.moduleTitle + '</span>';

    var eyebrow = document.createElement("div");
    eyebrow.className = "lesson-eyebrow";
    eyebrow.textContent = "Lesson " + current.n + " of " + window.LESSON_TOTAL;

    var h1 = article.querySelector("h1");
    article.insertBefore(eyebrow, h1);
    article.insertBefore(crumb, eyebrow);

    // meta bar after the lead (or after h1 if no lead)
    var lead = article.querySelector(".lead");
    var meta = document.createElement("div");
    meta.className = "lesson-meta";
    meta.innerHTML =
      '<span class="m">' + ICON.clock + ' ' + readMin + ' min read</span>' +
      '<span class="m">' + ICON.book + ' Module ' + current.module + '</span>';
    var anchor = lead || h1;
    if (anchor.nextSibling) anchor.parentNode.insertBefore(meta, anchor.nextSibling);
    else anchor.parentNode.appendChild(meta);
  }

  /* ---- Headings: ids + anchors -------------------------------------- */
  function slugify(t) {
    return t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 60);
  }
  function processHeadings(article) {
    var used = {};
    article.querySelectorAll("h2, h3").forEach(function (h) {
      var id = h.id || slugify(h.textContent);
      if (used[id]) id = id + "-" + (used[id]++); else used[id] = 1;
      h.id = id;
      var a = document.createElement("a");
      a.href = "#" + id;
      a.className = "anchor";
      a.setAttribute("aria-hidden", "true");
      a.textContent = "#";
      h.appendChild(a);
    });
  }

  /* ---- Table of contents -------------------------------------------- */
  function buildTOC(article) {
    var heads = article.querySelectorAll("h2, h3");
    if (heads.length < 2) return;
    var toc = document.createElement("nav");
    toc.className = "toc";
    var html = '<div class="toc-title">On this page</div>';
    heads.forEach(function (h) {
      var lvl = h.tagName === "H3" ? " h3" : "";
      var txt = h.textContent.replace(/#$/, "");
      html += '<a href="#' + h.id + '" class="' + (lvl ? "h3" : "") + '" data-target="' + h.id + '">' + txt + '</a>';
    });
    toc.innerHTML = html;
    document.body.appendChild(toc);

    // scroll spy
    var links = toc.querySelectorAll("a");
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute("data-target")] = l; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          if (byId[e.target.id]) byId[e.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { spy.observe(h); });
  }

  /* ---- Pager + mark done -------------------------------------------- */
  function buildPager(article, current) {
    var idx = current.n - 1;
    var prev = window.LESSONS_FLAT[idx - 1];
    var next = window.LESSONS_FLAT[idx + 1];
    var content = document.querySelector(".content");

    // mark-done button
    var btn = document.createElement("button");
    btn.className = "mark-done" + (getProgress()[current.id] ? " done" : "");
    btn.innerHTML = '<span class="box">' + ICON.check + '</span><span class="txt">' +
      (getProgress()[current.id] ? "Completed" : "Mark as complete") + '</span>';
    btn.addEventListener("click", function () {
      var done = !btn.classList.contains("done");
      btn.classList.toggle("done", done);
      btn.querySelector(".txt").textContent = done ? "Completed" : "Mark as complete";
      setDone(current.id, done);
      var link = document.querySelector('.lesson-link[data-id="' + current.id + '"]');
      if (link) link.classList.toggle("done", done);
      updateProgressUI();
    });
    article.appendChild(btn);

    var pager = document.createElement("nav");
    pager.className = "pager";
    pager.innerHTML =
      (prev
        ? '<a class="prev" href="' + ROOT + prev.href + '"><span class="dir">' + ICON.arrowL + ' Previous</span><span class="ttl">' + prev.title + '</span></a>'
        : '<span class="placeholder"></span>') +
      (next
        ? '<a class="next" href="' + ROOT + next.href + '"><span class="dir">Next ' + ICON.arrowR + '</span><span class="ttl">' + next.title + '</span></a>'
        : '<span class="placeholder"></span>');
    content.appendChild(pager);

    // keyboard nav
    document.addEventListener("keydown", function (e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft" && prev) location.href = ROOT + prev.href;
      if (e.key === "ArrowRight" && next) location.href = ROOT + next.href;
    });
  }

  /* ---- Code blocks: header, copy, highlight ------------------------- */
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var KEYWORDS = ("alignas alignof and asm auto bool break case catch class const consteval constexpr constinit " +
    "const_cast continue co_await co_return co_yield decltype default delete do dynamic_cast else enum explicit " +
    "export extern false final float for friend goto if inline mutable namespace new noexcept not nullptr operator " +
    "or override private protected public register reinterpret_cast return sizeof static static_assert static_cast " +
    "struct switch template this thread_local throw true try typedef typeid typename union using virtual volatile while " +
    "cbuffer register technique pass numthreads groupshared in out inout uniform row_major discard").split(/\s+/);

  var TYPES = ("void bool char short int long float double signed unsigned wchar_t char16_t char32_t auto size_t " +
    "int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t std string wstring vector array map set " +
    "unordered_map pair tuple unique_ptr shared_ptr weak_ptr function ostream istream " +
    "float2 float3 float4 float4x4 float3x3 matrix half double2 double3 double4 " +
    "SamplerState Texture2D Texture2DArray TextureCube").split(/\s+/);

  var KW = {}, TY = {};
  KEYWORDS.forEach(function (k) { KW[k] = 1; });
  TYPES.forEach(function (t) { TY[t] = 1; });

  function highlight(code, lang) {
    lang = (lang || "").toLowerCase();
    if (!/^(cpp|c|c\+\+|hlsl|shader)$/.test(lang)) return escapeHtml(code);

    var rules = [
      ["comment", /^\/\/[^\n]*/],
      ["comment", /^\/\*[\s\S]*?\*\//],
      ["pre", /^[ \t]*#[^\n]*/],
      ["str", /^"(?:\\.|[^"\\\n])*"/],
      ["str", /^'(?:\\.|[^'\\\n])*'/],
      ["num", /^\b(?:0[xX][0-9a-fA-F']+|\d[\d'.]*(?:[eE][+-]?\d+)?[fFuUlL]*)\b/],
      ["ws", /^\s+/],
      ["word", /^[A-Za-z_]\w*/],
      ["other", /^[\s\S]/]
    ];

    var out = "";
    var s = code;
    var guard = 0;
    while (s.length && guard++ < 100000) {
      var matched = false;
      for (var r = 0; r < rules.length; r++) {
        var m = rules[r][1].exec(s);
        if (!m) continue;
        var text = m[0];
        var type = rules[r][0];
        if (type === "word") {
          var rest = s.slice(text.length);
          if (KW[text]) out += '<span class="tok-key">' + text + "</span>";
          else if (/^\s*\(/.test(rest) && !KW[text]) out += '<span class="tok-fn">' + text + "</span>";
          else if (TY[text] || /^[A-Z]/.test(text) || /_t$/.test(text)) out += '<span class="tok-type">' + text + "</span>";
          else out += escapeHtml(text);
        } else if (type === "ws" || type === "other") {
          out += escapeHtml(text);
        } else {
          out += '<span class="tok-' + type + '">' + escapeHtml(text) + "</span>";
        }
        s = s.slice(text.length);
        matched = true;
        break;
      }
      if (!matched) { out += escapeHtml(s[0]); s = s.slice(1); }
    }
    return out;
  }

  var LANG_LABEL = {
    cpp: "C++", "c++": "C++", c: "C", hlsl: "HLSL", shader: "GPU Shader",
    bash: "Shell", sh: "Shell", powershell: "PowerShell", ps: "PowerShell",
    console: "Console", text: "Text", cmake: "CMake", ini: "Config", xml: "XML",
    yaml: "YAML", yml: "YAML"
  };

  function enhanceCode(scope) {
    scope.querySelectorAll("pre > code").forEach(function (code) {
      var pre = code.parentNode;
      if (pre.parentNode && pre.parentNode.classList.contains("code-block")) return;
      var cls = code.className || "";
      var lm = cls.match(/(?:language|lang)-([\w+]+)/);
      var lang = lm ? lm[1] : "text";
      var file = code.getAttribute("data-file") || "";
      var raw = code.textContent;

      code.innerHTML = highlight(raw, lang);

      var block = document.createElement("div");
      block.className = "code-block";
      var head = document.createElement("div");
      head.className = "code-head";
      head.innerHTML =
        '<span class="dots"><i></i><i></i><i></i></span>' +
        '<span class="lang">' + (LANG_LABEL[lang] || lang.toUpperCase()) + '</span>' +
        (file ? '<span class="fname">' + file + '</span>' : '') +
        '<button class="copy-btn">' + ICON.copy + '<span>Copy</span></button>';
      pre.parentNode.insertBefore(block, pre);
      block.appendChild(head);
      block.appendChild(pre);

      head.querySelector(".copy-btn").addEventListener("click", function () {
        var btn = this;
        var done = function () {
          btn.classList.add("copied");
          btn.querySelector("span").textContent = "Copied!";
          setTimeout(function () { btn.classList.remove("copied"); btn.querySelector("span").textContent = "Copy"; }, 1600);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(raw).then(done, done);
        else {
          var ta = document.createElement("textarea"); ta.value = raw; document.body.appendChild(ta);
          ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); done();
        }
      });
    });
  }

  /* ---- Favicon (inline SVG, no external asset) ---------------------- */
  function injectFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#4aa8ff"/><stop offset="1" stop-color="#7c5cff"/></linearGradient></defs>' +
      '<rect width="32" height="32" rx="7" fill="url(#g)"/>' +
      '<text x="16" y="22" font-family="Segoe UI,Arial,sans-serif" font-size="13" font-weight="bold" ' +
      'text-anchor="middle" fill="#fff">C++</text></svg>';
    var link = document.createElement("link");
    link.rel = "icon";
    link.href = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    document.head.appendChild(link);
  }

  /* ---- Lesson build-task box (data from js/tasks.js, loaded on demand) */
  function loadTasks(cb) {
    if (window.TASKS) { cb(); return; }
    var s = document.createElement("script");
    s.src = ROOT + "js/tasks.js";
    s.onload = function () { cb(); };
    s.onerror = function () { /* no tasks file — skip gracefully */ };
    document.head.appendChild(s);
  }

  function injectTask(current) {
    var t = window.TASKS_BY_ID && window.TASKS_BY_ID[current.id];
    if (!t) return;
    var article = document.querySelector("article.lesson");
    if (!article || article.querySelector(".task")) return;
    var done = !!getTasksDone()[t.id];
    var diffClass = "diff-" + String(t.diff).replace(/[^A-Za-z]/g, "");
    var box = document.createElement("section");
    box.className = "task";
    box.innerHTML =
      '<div class="task-head">' +
        '<span class="task-icon">' + ICON.wrench + '</span>' +
        '<span class="task-label">Build Task</span>' +
        '<span class="task-num">#' + t.n + ' of ' + window.TASK_TOTAL + '</span>' +
        '<span class="task-badge ' + diffClass + '">' + escapeHtml(t.diff) + '</span>' +
        '<span class="task-builds">Builds: ' + escapeHtml(t.builds) + '</span>' +
      '</div>' +
      '<div class="task-title">' + escapeHtml(t.title) + '</div>' +
      '<p class="task-brief">' + escapeHtml(t.brief) + '</p>' +
      '<div class="task-deliverable"><strong>Deliverable:</strong> ' + escapeHtml(t.deliverable) + '</div>' +
      '<button class="task-check' + (done ? " done" : "") + '"><span class="box">' + ICON.check + '</span>' +
        '<span class="tc-txt">' + (done ? "Task complete" : "Mark task complete") + '</span></button>';
    var markDone = article.querySelector(".mark-done");
    if (markDone) article.insertBefore(box, markDone); else article.appendChild(box);
    var btn = box.querySelector(".task-check");
    btn.addEventListener("click", function () {
      var d = !btn.classList.contains("done");
      btn.classList.toggle("done", d);
      btn.querySelector(".tc-txt").textContent = d ? "Task complete" : "Mark task complete";
      setTaskDone(t.id, d);
    });
  }

  /* ---- Boot ---------------------------------------------------------- */
  function boot() {
    injectFavicon();
    initTheme();
    var article = document.querySelector("article.lesson");
    var isLesson = !!article && document.body.classList.contains("lesson-page");

    buildHeader(isLesson);

    if (isLesson) {
      var current = currentLesson();
      if (current) {
        buildSidebar(current);
        buildLessonHeader(article, current);
        processHeadings(article);
        enhanceCode(article);
        buildTOC(article);
        buildPager(article, current);
        loadTasks(function () { injectTask(current); });
        // active-link scroll into view within sidebar
        var active = document.querySelector(".lesson-link.active");
        if (active && active.scrollIntoView) active.scrollIntoView({ block: "center" });
      } else {
        enhanceCode(article);
      }
    } else {
      // landing / other pages: still enhance any code + expose progress helper
      enhanceCode(document);
      window.CPPDX_updateProgress = updateProgressUI;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

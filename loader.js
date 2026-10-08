(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    const loader = document.createElement("div");

    loader.id = "tv-loader";

    loader.setAttribute("role", "status");
    loader.setAttribute("aria-label", "Loading");

    loader.innerHTML = `
      <svg viewBox="0 0 200 170" aria-hidden="true">
        <path class="s" d="M30 28 H105"/>
        <path class="s s2" d="M140 38 L98 108"/>
        <path class="s s3" d="M60 62 L98 108"/>
      </svg>

      <h2 id="tv-name"></h2>

      <div class="bar">
        <i></i>
      </div>

      <p class="loading-text">Loading</p>
    `;

    document.body.prepend(loader);

    // TechVelter letters
    const nameEl = loader.querySelector("#tv-name");

    "TechVelter".split("").forEach((char, index) => {
      const span = document.createElement("span");

      span.textContent = char;
      span.style.animationDelay = `${index * 0.06}s`;

      nameEl.appendChild(span);
    });

    // Show loader
    requestAnimationFrame(() => {
      loader.classList.add("show");
    });

    // EXACTLY 3 SECONDS
    setTimeout(() => {
      loader.classList.remove("show");

      // Remove from page after fade-out
      setTimeout(() => {
        loader.remove();
      }, 500);

    }, 3000);

  });

})();
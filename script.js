document.addEventListener("DOMContentLoaded", () => {
  const togglePill = document.getElementById("toggle-pill");
  const knobIcon = document.getElementById("knob-icon");
  const body = document.body;
  const ambientGlow = document.getElementById("ambient-glow");
  const statusTitle = document.getElementById("status-title");
  const statusDesc = document.getElementById("status-desc");
  const statusBadge = document.getElementById("status-badge");
  const footerText = document.getElementById("footer-text");
  const headerIcon = document.getElementById("header-icon");
  const quickToggleBtn = document.getElementById("quick-toggle");

  // Current state: 'sleep' or 'work'
  let currentState = "sleep";

  // Audio synth feedback generator using Web Audio API (No external assets required)
  function playToggleSound(isWork) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      if (isWork) {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.12);
      } else {
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12);
      }

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      // Audio context may be restricted before interaction
    }
  }

  function setToggleState(state) {
    currentState = state;

    if (currentState === "work") {
      // Switch to WORK State
      togglePill.classList.remove("is-sleep", "sleep-glow");
      togglePill.classList.add("is-work", "work-glow");

      body.classList.remove("sleep-mode");
      body.classList.add("work-mode");

      knobIcon.className = "fa-solid fa-user knob-icon";

      ambientGlow.className =
        "absolute w-[320px] h-[200px] rounded-full blur-[90px] opacity-70 transition-all duration-700 pointer-events-none bg-amber-400/50";

      statusTitle.textContent = "Work Mode";
      statusTitle.className =
        "text-2xl font-bold text-gray-900 tracking-wide transition-all duration-500";

      statusDesc.textContent = "Warm golden aura with frosted light background";
      statusDesc.className =
        "text-sm text-gray-800/80 mt-1 transition-all duration-500";

      statusBadge.className =
        "w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]";
      footerText.textContent = "Active State: Work";
      headerIcon.className = "fa-solid fa-briefcase text-amber-300";

      playToggleSound(true);
    } else {
      // Switch to SLEEP State
      togglePill.classList.remove("is-work", "work-glow");
      togglePill.classList.add("is-sleep", "sleep-glow");

      body.classList.remove("work-mode");
      body.classList.add("sleep-mode");

      knobIcon.className = "fa-solid fa-moon knob-icon";

      ambientGlow.className =
        "absolute w-[320px] h-[200px] rounded-full blur-[90px] opacity-60 transition-all duration-700 pointer-events-none bg-purple-600/40";

      statusTitle.textContent = "Sleep Mode";
      statusTitle.className =
        "text-2xl font-bold text-white tracking-wide transition-all duration-500";

      statusDesc.textContent = "Soft indigo theme with glossy backdrop blur";
      statusDesc.className =
        "text-sm text-white/60 mt-1 transition-all duration-500";

      statusBadge.className =
        "w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]";
      footerText.textContent = "Active State: Sleep";
      headerIcon.className = "fa-solid fa-wand-magic-sparkles text-purple-400";

      playToggleSound(false);
    }
  }

  // Click Handlers
  togglePill.addEventListener("click", () => {
    const newState = currentState === "sleep" ? "work" : "sleep";
    setToggleState(newState);
  });

  quickToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const newState = currentState === "sleep" ? "work" : "sleep";
    setToggleState(newState);
  });

  // Keyboard navigation support
  togglePill.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const newState = currentState === "sleep" ? "work" : "sleep";
      setToggleState(newState);
    }
  });
});

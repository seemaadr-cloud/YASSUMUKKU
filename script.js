// 🎵 CUTE SOUND EFFECTS

let audioCtx;

function getAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  return audioCtx;
}

function cuteTone(frequency, duration, type = "sine", volume = 0.035, delay = 0) {
  const ctx = getAudio();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

  gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(ctx.currentTime + delay);
  oscillator.stop(ctx.currentTime + delay + duration);
}

function popSound() {
  cuteTone(520, 0.12, "sine", 0.04);
  cuteTone(780, 0.16, "sine", 0.025, 0.05);
}

function sparkleSound() {
  cuteTone(660, 0.12, "sine", 0.025);
  cuteTone(880, 0.12, "sine", 0.025, 0.08);
  cuteTone(1040, 0.16, "sine", 0.02, 0.16);
}

function clickSound() {
  cuteTone(500, 0.08, "sine", 0.025);
}

// =====================================
// INITIAL SCREEN
// =====================================

const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const message = document.getElementById("message");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const goBtn = document.getElementById("goBtn");

// =====================================
// OPEN THE LETTER
// =====================================

function openLetter() {
  clickSound();

  envelope.style.transform = "scale(0.85) rotate(-5deg)";
  envelope.style.opacity = "0";

  openBtn.style.display = "none";
  title.style.display = "none";
  subtitle.style.display = "none";

  setTimeout(() => {
    message.classList.remove("hidden");
  }, 500);
}

openBtn.addEventListener("click", openLetter);
envelope.addEventListener("click", openLetter);

// =====================================
// LET'S GO
// =====================================

goBtn.addEventListener("click", function () {
  popSound();

  document.querySelector(".page").innerHTML = `
    <div class="sticker sticker1">💗</div>
    <div class="sticker sticker2">♡</div>
    <div class="sticker sticker3">✨</div>

    <div class="web web1">🕸️</div>
    <div class="web web2">🕸️</div>

    <div class="main-card">
      <p class="tiny">welcome to...</p>

      <h1>
        Your little<br>
        corner of the internet 💗
      </h1>

      <p class="intro">
        Made especially for one<br>
        very special person. ✨
      </p>

      <div class="cards">
        <div class="card" id="letterCard">
          💌

          <h3>A little letter</h3>

          <p>Something I wanted to tell you...</p>
        </div>
      </div>

      <p class="bottom-text">Open it... 👀</p>
    </div>
  `;

  document.getElementById("letterCard").addEventListener("click", function () {
    sparkleSound();

    showSection(`
      <div class="popup-content">
        <div class="popup-icon">💌</div>

        <p class="tiny">for Yash...</p>

        <h1>A little letter</h1>

        <p>My baby,</p>

        <p>
          There are so many things I could say about you, but one thing that always
          stands out to me is how soft you are with me.
        </p>

        <p>
          I love the way you dream big, work hard, and keep looking ahead.
        </p>

        <p>
          And somewhere between all our conversations, memories and little moments,
          you became such an important part of my life.
        </p>

        <p>
          I don't think I have one favourite memory of us. There are simply too many. 💗
        </p>

        <p>
          And I hope someday we get to make a whole lot more of them together.
        </p>

        <p class="signature">— from your favourite person 🫶</p>

        <button class="backBtn">← Go back</button>
      </div>
    `);
  });
});

// =====================================
// SHOW SECTION
// =====================================

function showSection(content) {
  document.querySelector(".page").innerHTML = `
    <div class="web web1">🕸️</div>
    <div class="web web2">🕸️</div>

    <div class="popup-box">
      ${content}
    </div>
  `;

  document.querySelector(".backBtn").addEventListener("click", function () {
    clickSound();
    location.reload();
  });
}

// =========================
// ELEMENTS
// =========================

const gameArea =
  document.getElementById("gameArea");

const player =
  document.getElementById("player");

const scoreText =
  document.getElementById("score");

const startText =
  document.getElementById("startText");

// =========================
// STATE
// =========================

let gameStarted = false;

let gameOver = false;

let score = 0;

// =========================
// PLAYER
// =========================

let playerY = 250;

let velocity = 0;

const gravity = 0.5;

const jump = -8;

// =========================
// START
// =========================

document.addEventListener(
  "click",
  startGame
);

document.addEventListener(
  "touchstart",
  startGame
);

// =========================
// START GAME
// =========================

function startGame() {

  if (gameOver) return;

  if (!gameStarted) {

    gameStarted = true;

    startText.style.display =
      "none";

    setInterval(
      createPipe,
      1800
    );

    requestAnimationFrame(update);
  }

  velocity = jump;
}

// =========================
// UPDATE
// =========================

function update() {

  if (gameOver) return;

  velocity += gravity;

  playerY += velocity;

  player.style.top =
    `${playerY}px`;

  // FLOOR

  if (
    playerY >
    gameArea.offsetHeight - 90
  ) {

    endGame();
  }

  // SKY

  if (playerY < 0) {
    playerY = 0;
  }

  // PIPES

  const pipes =
    document.querySelectorAll(".pipe");

  pipes.forEach((pipe) => {

    const pipeX =
      parseFloat(pipe.style.left);

    pipe.style.left =
      `${pipeX - 3}px`;

    // REMOVE

    if (pipeX < -100) {

      pipe.remove();

      score++;

      scoreText.innerHTML =
        score;

      if (score >= 22) {

        finishGame();
      }
    }

    // COLLISION

    if (
      collision(player, pipe)
    ) {

      endGame();
    }
  });

  requestAnimationFrame(update);
}

// =========================
// CREATE PIPE
// =========================

function createPipe() {

  if (gameOver) return;

  const gap = 220;

  const pipeWidth = 80;

  const minHeight = 80;

  const maxHeight =
    gameArea.offsetHeight - gap - 80;

  const topHeight =
    Math.random() *
    (maxHeight - minHeight) +
    minHeight;

  // TOP PIPE

  const topPipe =
    document.createElement("div");

  topPipe.classList.add("pipe");

  topPipe.style.height =
    `${topHeight}px`;

  topPipe.style.left =
    `${gameArea.offsetWidth}px`;

  topPipe.style.top = "0";

  // BOTTOM PIPE

  const bottomPipe =
    document.createElement("div");

  bottomPipe.classList.add("pipe");

  bottomPipe.style.height =
    `${gameArea.offsetHeight - topHeight - gap}px`;

  bottomPipe.style.left =
    `${gameArea.offsetWidth}px`;

  bottomPipe.style.bottom = "0";

  gameArea.appendChild(topPipe);

  gameArea.appendChild(bottomPipe);
}

// =========================
// COLLISION
// =========================

function collision(a, b) {

  const aRect =
    a.getBoundingClientRect();

  const bRect =
    b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

// =========================
// END
// =========================

function endGame() {

  gameOver = true;

  startText.style.display =
    "flex";

  startText.innerHTML =
    "GAME OVER 💔";

    setTimeout(() => {
        location.reload(); // Recarga la página después de 0.1 segundo
    }, 1 * 500);
}

// =========================
// FINISH
// =========================

function finishGame() {

  gameOver = true;

  const final =
    document.createElement("div");

  final.classList.add(
    "final-screen"
  );

  final.innerHTML = `
    <h2>
      Has sobrevivido al caos 💖
    </h2>

    <p>
      Código desbloqueado:
    </p>

    <div class="code">
      MESALVASTE65321
    </div>
  `;

  document.body.appendChild(final);
}
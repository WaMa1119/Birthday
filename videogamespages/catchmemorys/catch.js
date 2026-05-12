// =========================
// ELEMENTS
// =========================

const gameArea =
  document.getElementById("gameArea");

const player =
  document.getElementById("player");

const scoreText =
  document.getElementById("score");

const livesText =
  document.getElementById("lives");

const message =
  document.getElementById("message");

// =========================
// STATE
// =========================

let score = 0;

let lives = 3;

let gameRunning = true;

// =========================
// ITEMS
// =========================

const goodItems = [
  "❤️",
  "🎮",
  "⭐",
  "☕",
  "🎵",
  "🌙",
  "📸"
];

const badItems = [
  "💔",
  "☠️"
];

// =========================
// PLAYER
// =========================

let playerX =
  window.innerWidth / 2;

// =========================
// MOVE PLAYER
// =========================

document.addEventListener(
  "mousemove",
  (e) => {

    movePlayer(e.clientX);
  }
);

document.addEventListener(
  "touchmove",
  (e) => {

    movePlayer(
      e.touches[0].clientX
    );
  }
);

function movePlayer(x) {

  const rect =
    gameArea.getBoundingClientRect();

  playerX =
    x - rect.left;

  if (playerX < 30) {
    playerX = 30;
  }

  if (playerX > rect.width - 30) {
    playerX = rect.width - 30;
  }

  player.style.left =
    `${playerX}px`;
}

// =========================
// SPAWN ITEMS
// =========================

setInterval(() => {

  if (!gameRunning) return;

  spawnItem();

}, 700);

// =========================
// CREATE ITEM
// =========================

function spawnItem() {

  const item =
    document.createElement("div");

  item.classList.add("item");

  const isBad =
    Math.random() < 0.2;

  item.innerHTML =
    isBad
      ? random(badItems)
      : random(goodItems);

  item.dataset.type =
    isBad
      ? "bad"
      : "good";

  const rect =
    gameArea.getBoundingClientRect();

  const x =
    Math.random() *
    (rect.width - 40);

  item.style.left =
    `${x}px`;

  item.style.top = "-40px";

  gameArea.appendChild(item);

  fallItem(item);
}

// =========================
// FALL
// =========================

function fallItem(item) {

  let y = -40;

  const speed =
    3 + Math.random() * 3;

  const interval =
    setInterval(() => {

      if (!gameRunning) {
        clearInterval(interval);
        return;
      }

      y += speed;

      item.style.top =
        `${y}px`;

      checkCollision(
        item,
        interval
      );

      if (
        y >
        gameArea.offsetHeight
      ) {

        if (
          item.dataset.type === "good"
        ) {

          loseLife();
        }

        item.remove();

        clearInterval(interval);
      }

    }, 16);
}

// =========================
// COLLISION
// =========================

function checkCollision(
  item,
  interval
) {

  const itemRect =
    item.getBoundingClientRect();

  const playerRect =
    player.getBoundingClientRect();

  const collide =
    itemRect.bottom >= playerRect.top &&
    itemRect.left < playerRect.right &&
    itemRect.right > playerRect.left;

  if (!collide) return;

  if (
    item.dataset.type === "good"
  ) {

    score++;

    scoreText.innerHTML =
      `SCORE: ${score}`;

    if (score >= 50) {

      finishGame();
    }
  }

  else {

    loseLife();
  }

  item.remove();

  clearInterval(interval);
}

// =========================
// LIFE
// =========================

function loseLife() {

  lives--;

  updateLives();

  if (lives <= 0) {

    gameOver();
  }
}

// =========================
// UPDATE LIVES
// =========================

function updateLives() {

  livesText.innerHTML =
    "❤️".repeat(lives);
}

// =========================
// GAME OVER
// =========================

function gameOver() {

  gameRunning = false;

  message.innerHTML =
    "GAME OVER 💔";
}

// =========================
// FINISH
// =========================

function finishGame() {

  gameRunning = false;

  const final =
    document.createElement("div");

  final.classList.add(
    "final-screen"
  );

  final.innerHTML = `
    <h2>
      Has atrapado todos nuestros recuerdos 💖
    </h2>

    <p>
      Código desbloqueado:
    </p>

    <div class="code">
      ERESDEMASIADOBUENAPARATODO56532
    </div>
  `;

  document.body.appendChild(final);
}

// =========================
// RANDOM
// =========================

function random(array) {

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];
}
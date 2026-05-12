// =========================
// LEVELS
// =========================

const levels = [
  {
    cards: 4,
    moves: 4
  },
  {
    cards: 8,
    moves: 10
  },
  {
    cards: 16,
    moves: 20
  },
  {
    cards: 32,
    moves: 45
  }
];

// =========================
// ELEMENTS
// =========================

const board =
  document.getElementById("gameBoard");

const levelText =
  document.getElementById("levelText");

const movesText =
  document.getElementById("movesText");

const message =
  document.getElementById("message");

// =========================
// SOUNDS
// =========================

const flipSound =
  document.getElementById("flipSound");

const successSound =
  document.getElementById("successSound");

const failSound =
  document.getElementById("failSound");

const winSound =
  document.getElementById("winSound");

// =========================
// GAME STATE
// =========================

let currentLevel = 0;

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let matches = 0;

// =========================
// START
// =========================

startLevel();

// =========================
// LEVEL START
// =========================

function startLevel() {

  board.innerHTML = "";

  firstCard = null;
  secondCard = null;

  lockBoard = false;

  moves = 0;
  matches = 0;

  const level = levels[currentLevel];

  levelText.innerHTML =
    `NIVEL ${currentLevel + 1}`;

  updateMoves();

  // GRID

  if (level.cards <= 4) {
    board.style.gridTemplateColumns =
      "repeat(2, 1fr)";
  }

  else if (level.cards <= 8) {
    board.style.gridTemplateColumns =
      "repeat(4, 1fr)";
  }

  else if (level.cards <= 16) {
    board.style.gridTemplateColumns =
      "repeat(4, 1fr)";
  }

  else {
    board.style.gridTemplateColumns =
      "repeat(8, 1fr)";
  }

  // IMAGES

  const neededPairs =
    level.cards / 2;

  let images = [];

  for (let i = 1; i <= neededPairs; i++) {
    images.push(`assets/img/${i}.jpg`);
  }

  const cardsArray =
    [...images, ...images]
      .sort(() => Math.random() - 0.5);

  // CREATE CARDS

  cardsArray.forEach((img) => {

    const card =
      document.createElement("div");

    card.classList.add("card");

    card.dataset.image = img;

    card.innerHTML = `
      <div class="face front">💖</div>

      <div class="face back">
        <img src="${img}">
      </div>
    `;

    card.addEventListener(
      "click",
      flipCard
    );

    board.appendChild(card);
  });
}

// =========================
// FLIP
// =========================

function flipCard() {

  if (lockBoard) return;

  if (this === firstCard) return;

  flipSound.currentTime = 0;
  flipSound.play();

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  moves++;

  updateMoves();

  checkMatch();
}

// =========================
// MATCH
// =========================

function checkMatch() {

  const isMatch =
    firstCard.dataset.image ===
    secondCard.dataset.image;

  if (isMatch) {

    successSound.currentTime = 0;
    successSound.play();

    disableCards();

    matches++;

    const totalPairs =
      levels[currentLevel].cards / 2;

    if (matches === totalPairs) {

      setTimeout(() => {

        if (
          currentLevel <
          levels.length - 1
        ) {

          currentLevel++;

          message.innerHTML =
            "NIVEL COMPLETADO 💖";

          startLevel();
        }

        else {

          finishGame();
        }

      }, 1000);
    }

    return;
  }

  unflipCards();

  // LOSE

  if (
    moves >= levels[currentLevel].moves
  ) {

    setTimeout(() => {

      failSound.currentTime = 0;
      failSound.play();

      message.innerHTML =
        "SIN MOVIMIENTOS 💔";

      startLevel();

    }, 800);
  }
}

// =========================
// DISABLE
// =========================

function disableCards() {

  firstCard.removeEventListener(
    "click",
    flipCard
  );

  secondCard.removeEventListener(
    "click",
    flipCard
  );

  resetBoard();
}

// =========================
// UNFLIP
// =========================

function unflipCards() {

  lockBoard = true;

  setTimeout(() => {

    firstCard.classList.remove(
      "flipped"
    );

    secondCard.classList.remove(
      "flipped"
    );

    resetBoard();

  }, 1000);
}

// =========================
// RESET
// =========================

function resetBoard() {

  firstCard = null;
  secondCard = null;

  lockBoard = false;
}

// =========================
// MOVES
// =========================

function updateMoves() {

  movesText.innerHTML =
    `MOVIMIENTOS: ${moves}/${levels[currentLevel].moves}`;
}

// =========================
// FINISH
// =========================

function finishGame() {

  winSound.currentTime = 0;
  winSound.play();

  const screen =
    document.createElement("div");

  screen.classList.add(
    "final-screen"
  );

  screen.innerHTML = `
    <h2>
      Has encontrado todos nuestros recuerdos ❤️
    </h2>

    <p>
      Código desbloqueado:
    </p>

    <div class="code">
      ERESLAMEJORPRINCESA221155
    </div>
  `;

  document.body.appendChild(screen);
}

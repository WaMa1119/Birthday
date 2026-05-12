// =========================
// QUESTIONS
// =========================

const questions = [
  {
    question: "¿Cuándo nos casaremos? (Ejemplo: 9 de febrero del 1998)",
    answer: "11 de septiembre del 2029"
  },

  {
    question: "¿Cuándo te me declaraste? (Ejemplo: 9 de febrero del 1998)",
    answer: "20 de mayo del 2024"
  },

  {
    question: "¿Cuánto te amo? (Numero)",
    answer: "3000000"
  },

  {
    question: "Mi frase de todas las noches",
    answer: "buenas noches princesa"
  },

  {
    question: "¿Cuántos hijos tendremos?",
    answer: "2"
  },

  {
    question: "¿Con cuál número juega mi jugador favorito?",
    answer: "17"
  },

  {
    question: "¿Cuál fue mi primer regalo como novio?",
    answer: "pantuflas de naruto"
  },

  {
    question: "¿Cuál fue nuestro primer viaje/salida larga?",
    answer: "sarapiqui"
  },

  {
    question: "¿Qué juego me obsesiona más?",
    answer: "fifa"
  },

  {
    question: "¿Qué miedo mío conoces muy bien?",
    answer: "perderte"
  },

  {
    question: "¿Qué canción definitivamente sonaría en nuestra película?",
    answer: "mi gran amor"
  },

  {
    question: "¿Qué significa “hogar” para mí?",
    answer: "genesis"
  }
];

// =========================
// ELEMENTS
// =========================

const output =
  document.getElementById(
    "terminalOutput"
  );

const input =
  document.getElementById(
    "terminalInput"
  );

// =========================
// STATE
// =========================

let currentQuestion = 0;

// =========================
// START
// =========================

printLine(
  "SYSTEM INITIALIZED..."
);

printLine(
  "ACCESSING HEART.LOG..."
);

printLine("");

showQuestion();

// =========================
// SHOW QUESTION
// =========================

function showQuestion() {

  if (
    currentQuestion >= questions.length
  ) {

    finishGame();

    return;
  }

  printLine(
    `QUESTION ${currentQuestion + 1}`
  );

  printLine(
    questions[currentQuestion].question
  );

  printLine("");
}

// =========================
// INPUT
// =========================

input.addEventListener(
  "keydown",
  (e) => {

    if (e.key !== "Enter") return;

    const value =
      input.value
        .toLowerCase()
        .trim();

    printLine(
      `> ${input.value}`
    );

    validateAnswer(value);

    input.value = "";
  }
);

// =========================
// VALIDATE
// =========================

function validateAnswer(answer) {

  const correct =
    questions[currentQuestion]
      .answer;

  if (answer === correct) {

    printLine(
      "ACCESS GRANTED",
      "success"
    );

    printLine(
      "MEMORY RECOVERED..."
    );

    printLine("");

    currentQuestion++;

    showQuestion();

    return;
  }

  printLine(
    "INVALID RESPONSE",
    "error"
  );

  printLine(
    "TRY AGAIN..."
  );

  printLine("");
}

// =========================
// PRINT
// =========================

function printLine(
  text,
  className = ""
) {

  const line =
    document.createElement("div");

  line.classList.add("line");

  if (className) {
    line.classList.add(className);
  }

  line.textContent = text;

  output.appendChild(line);

  output.scrollTop =
    output.scrollHeight;
}

// =========================
// FINISH
// =========================

function finishGame() {

  printLine("");
  printLine(
    "ALL MEMORIES RECOVERED",
    "success"
  );

  printLine("");

  const final =
    document.createElement("div");

  final.classList.add("final");

  final.innerHTML = `
    <div class="line">
      Código desbloqueado:
    </div>

    <div class="code">
      SEP112029
    </div>
  `;

  output.appendChild(final);

  input.disabled = true;
}
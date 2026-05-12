// =========================
// TARGET DATE
// =========================

const targetDate =
  new Date("2026-05-20T00:00:00").getTime();

// =========================
// LOCAL STORAGE
// =========================

let unlockedHours =
  Number(localStorage.getItem("unlockedHours")) || 0;

let usedCodes =
  JSON.parse(localStorage.getItem("usedCodes")) || [];

// =========================
// CODES
// =========================

const codes = {
  ERESDEMASIADOBUENAPARATODO56532: 12,
  MESALVASTE65321: 12,
  ERESLAMEJORPRINCESA221155: 12,
  SEP112029: 12
};

// =========================
// ELEMENTS
// =========================

const countdown =
  document.getElementById("countdown");

const codeInput =
  document.getElementById("codeInput");

const submitBtn =
  document.getElementById("submitBtn");

const message =
  document.getElementById("message");

// =========================
// COUNTDOWN
// =========================

function updateCountdown() {

  const adjustedDate =
    targetDate -
    (unlockedHours * 60 * 60 * 1000);

  const now = new Date().getTime();

  const distance = adjustedDate - now;

  if (distance <= 0) {
    countdown.innerHTML = "00:00:00:00";
    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  countdown.innerHTML =
    `${String(days).padStart(2, "0")}:` +
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

setInterval(updateCountdown, 1000);

updateCountdown();

// =========================
// CODE SYSTEM
// =========================

function redeemCode() {

  const code =
    codeInput.value.trim().toUpperCase();

  if (!code) return;

  // INVALID

  if (!codes[code]) {
    message.innerHTML = "CÓDIGO INVÁLIDO";
    return;
  }

  // USED

  if (usedCodes.includes(code)) {
    message.innerHTML = "CÓDIGO YA UTILIZADO";
    return;
  }

  // SUCCESS

  const reward = codes[code];

  unlockedHours += reward;

  usedCodes.push(code);

  localStorage.setItem(
    "unlockedHours",
    unlockedHours
  );

  localStorage.setItem(
    "usedCodes",
    JSON.stringify(usedCodes)
  );

  message.innerHTML =
    `-${reward} HORAS DESBLOQUEADAS`;

  codeInput.value = "";

  updateCountdown();
}

// =========================
// EVENTS
// =========================

submitBtn.addEventListener(
  "click",
  redeemCode
);

codeInput.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Enter") {
      redeemCode();
    }
  }
);
// Fake loading screen
setTimeout(() => {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("intro").classList.remove("hidden");
  typeText();
}, 2500);

// Typing Animation
const message =
  "Hi Golu ❤️\nI made something cute for you...\nA tiny fun game 😊";

let i = 0;

function typeText() {
  const typing = document.getElementById("typing");

  if (i < message.length) {
    typing.innerHTML += message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  showQ1();
}

// Quiz Flow
function showQ1() {
  showQuestion(
    "What do we hate more?",
    ["Client calls 😩", "Pointless meetings 😭"],
    "Correct answer: BOTH."
  );
}

function showQ2() {
  showQuestion(
    "Where did we meet?",
    ["MBA life 📚", "At a client site 💼"],
    "MBA life it is ❤️ Best decision ever."
  );
}

function showQ3() {
  showQuestion(
    "Hardest part of consulting?",
    ["Excel", "PPT", "Pretending to be excited on calls"],
    "Trick question. All of the above 😄"
  );
}

let qStep = 1;

function showQuestion(q, opts, result) {
  document.getElementById("questionBox").classList.remove("hidden");
  document.getElementById("question").innerText = q;

  let html = "";

  opts.forEach(o => {
    html += `<button onclick="answer('${result}')">${o}</button>`;
  });

  document.getElementById("options").innerHTML = html;
}

function answer(res) {
  alert(res);

  if (qStep == 1) showQ2();
  if (qStep == 2) showQ3();
  if (qStep == 3) final();

  qStep++;
}

function final() {
  document.getElementById("questionBox").classList.add("hidden");
  document.getElementById("finalBox").classList.remove("hidden");
}

// Moving NO button
function move(btn) {
  btn.style.position = "absolute";
  btn.style.top = Math.random() * 80 + "%";
  btn.style.left = Math.random() * 80 + "%";
}

// YES clicked
function yes() {
  document.getElementById("finalBox").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("song").play();

  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  setInterval(() => {
    confetti({
      particleCount: 100,
      spread: 60
    });
  }, 2000);
}

// Floating hearts background
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 400);

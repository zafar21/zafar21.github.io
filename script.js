let step = 0;

const messages = [
  "I wanted to ask you something 😊",
  "But first a tiny journey...",
  "You make my days better",
  "And I love talking to you",
  "So I have a question for you..."
];

function nextStep() {
  if (step < messages.length) {
    document.getElementById("text").innerText = messages[step];
    step++;
  } else {
    document.getElementById("gameBox").classList.add("hidden");
    document.getElementById("finalBox").classList.remove("hidden");
  }
}

function moveNo(btn) {
  btn.style.position = "absolute";
  btn.style.top = Math.random() * 80 + "%";
  btn.style.left = Math.random() * 80 + "%";
}

function yesClicked() {
  document.getElementById("finalBox").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
}

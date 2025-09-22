import Game from "./Game.js";

function initGame() {
  new Game();
}

document.addEventListener("DOMContentLoaded", initGame);

console.log("Gnome Hunt Game loaded");

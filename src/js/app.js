import Game from './Game.js';

let game;

function initGame() {
  game = new Game();
}

document.addEventListener("DOMContentLoaded", initGame);

console.log("Gnome Hunt Game loaded");

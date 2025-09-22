import GameField from "./GameField.js";
import Gnome from "./Gnome.js";
import GameStats from "./GameStats.js";

export default class Game {
  constructor() {
    this.gameField = null;
    this.gnome = null;
    this.stats = null;
    this.gameTimer = null;
    this.gnomeTimer = null;
    this.isGameActive = false;
    this.gnomeTimeout = 1000;

    this.init();
  }

  init() {
    const fieldContainer = document.getElementById("gameField");
    this.gameField = new GameField(fieldContainer);
    this.gnome = new Gnome();
    this.stats = new GameStats();

    this.bindEvents();
  }

  bindEvents() {
    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");

    startBtn.addEventListener("click", () => this.startGame());
    restartBtn.addEventListener("click", () => this.restartGame());
  }

  startGame() {
    this.isGameActive = true;
    this.stats.reset();
    this.hideUI();
    this.spawnGnome();

    const startBtn = document.getElementById("startBtn");
    startBtn.disabled = true;
  }

  restartGame() {
    this.stopGame();
    this.hideGameOver();
    this.startGame();
  }

  stopGame() {
    this.isGameActive = false;

    if (this.gnomeTimer) {
      clearTimeout(this.gnomeTimer);
    }

    this.gnome.hide();

    const startBtn = document.getElementById("startBtn");
    startBtn.disabled = false;
  }

  spawnGnome() {
    if (!this.isGameActive) return;

    let targetCell;
    const currentGnomeCell = this.gnome.getCurrentCell();

    do {
      targetCell = this.gameField.getRandomCell();
    } while (targetCell === currentGnomeCell && this.gameField.totalCells > 1);

    this.gnome.show(targetCell, () => this.onGnomeHit(targetCell));

    this.gnomeTimer = setTimeout(() => {
      if (this.isGameActive && this.gnome.isVisible) {
        this.onGnomeMiss();
      }
    }, this.gnomeTimeout);
  }

  onGnomeHit(cell) {
    if (!this.isGameActive) return;

    this.stats.addScore();
    this.showHitEffect(cell);
    this.gnome.hide();

    // Гоблин исчезает и сразу появляется в новой ячейке
    this.spawnGnome();
  }

  onGnomeMiss() {
    if (!this.isGameActive) return;

    this.gnome.hide();
    const isGameOver = this.stats.addMiss();

    if (isGameOver) {
      this.endGame();
    } else {
      // Фиксированный интервал - ровно 1 секунда
      this.gnomeTimer = setTimeout(() => this.spawnGnome(), this.gnomeTimeout);
    }
  }

  showHitEffect(cell) {
    const effect = document.createElement("div");
    effect.className = "hit-effect";
    effect.textContent = "+1";
    cell.append(effect);

    setTimeout(() => {
      effect.remove();
    }, 600);
  }

  endGame() {
    this.stopGame();
    this.showGameOver();
  }

  hideUI() {
    const gameOver = document.getElementById("gameOver");
    gameOver.style.display = "none";
  }

  showGameOver() {
    const gameOver = document.getElementById("gameOver");
    const restartBtn = document.getElementById("restartBtn");

    gameOver.style.display = "block";
    restartBtn.style.display = "inline-block";
  }

  hideGameOver() {
    const gameOver = document.getElementById("gameOver");
    const restartBtn = document.getElementById("restartBtn");

    gameOver.style.display = "none";
    restartBtn.style.display = "none";
  }
}

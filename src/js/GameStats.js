export default class GameStats {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.scoreElement = document.getElementById("score");
    this.missesElement = document.getElementById("misses");
    this.finalScoreElement = document.getElementById("finalScore");
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.updateDisplay();
  }

  addScore(points = 1) {
    this.score += points;
    this.updateDisplay();
  }

  addMiss() {
    this.misses++;
    this.updateDisplay();
    return this.misses >= this.maxMisses;
  }

  updateDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
    if (this.missesElement) {
      this.missesElement.textContent = this.misses;
    }
    if (this.finalScoreElement) {
      this.finalScoreElement.textContent = this.score;
    }
  }

  getScore() {
    return this.score;
  }

  getMisses() {
    return this.misses;
  }

  isGameOver() {
    return this.misses >= this.maxMisses;
  }
}

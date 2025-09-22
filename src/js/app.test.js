import GameField from "./GameField.js";
import GameStats from "./GameStats.js";

describe("Gnome Hunt Game", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="gameField"></div>
      <span id="score">0</span>
      <span id="misses">0</span>
      <span id="finalScore">0</span>
    `;
  });

  test("игровое поле должно создаваться", () => {
    const gameField = document.getElementById("gameField");
    expect(gameField).toBeTruthy();
  });

  test("GameField создает правильное количество ячеек", () => {
    const container = document.getElementById("gameField");
    const gameField = new GameField(container);

    expect(gameField.cells).toHaveLength(16);
    expect(container.querySelectorAll(".cell")).toHaveLength(16);
  });

  test("GameStats правильно обрабатывает счет", () => {
    const stats = new GameStats();

    expect(stats.getScore()).toBe(0);

    stats.addScore();
    expect(stats.getScore()).toBe(1);

    stats.addScore(5);
    expect(stats.getScore()).toBe(6);
  });

  test("GameStats правильно обрабатывает пропуски", () => {
    const stats = new GameStats();

    expect(stats.getMisses()).toBe(0);
    expect(stats.isGameOver()).toBe(false);

    for (let i = 0; i < 4; i++) {
      const gameOver = stats.addMiss();
      expect(gameOver).toBe(false);
    }

    const gameOver = stats.addMiss();
    expect(gameOver).toBe(true);
    expect(stats.isGameOver()).toBe(true);
  });
});

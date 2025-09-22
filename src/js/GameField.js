export default class GameField {
  constructor(container, size = 4) {
    this.container = container;
    this.size = size;
    this.totalCells = size * size;
    this.cells = [];
    this.init();
  }

  init() {
    this.container.innerHTML = '';
    this.cells = [];
    
    for (let i = 0; i < this.totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell() {
    const randomIndex = Math.floor(Math.random() * this.totalCells);
    return this.cells[randomIndex];
  }

  getCellByIndex(index) {
    return this.cells[index];
  }

  clearAll() {
    this.cells.forEach(cell => {
      cell.innerHTML = '';
    });
  }
}

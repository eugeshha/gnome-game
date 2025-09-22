import gnomeImage from "../img/gnome.png";

export default class Gnome {
  constructor() {
    this.element = null;
    this.currentCell = null;
    this.isVisible = false;
    this.clickHandler = null;
  }

  create() {
    this.element = document.createElement("img");
    this.element.src = gnomeImage;
    this.element.alt = "Gnome";
    this.element.className = "gnome";
    return this.element;
  }

  show(cell, onHit) {
    if (this.isVisible) {
      this.hide();
    }

    this.currentCell = cell;
    this.isVisible = true;

    if (!this.element) {
      this.create();
    }

    this.clickHandler = (event) => {
      event.stopPropagation();
      this.hide();
      onHit();
    };

    this.element.addEventListener("click", this.clickHandler);
    cell.append(this.element);
  }

  hide() {
    if (this.element && this.currentCell) {
      if (this.clickHandler) {
        this.element.removeEventListener("click", this.clickHandler);
      }
      this.element.remove();
      this.currentCell = null;
      this.isVisible = false;
    }
  }

  getCurrentCell() {
    return this.currentCell;
  }
}

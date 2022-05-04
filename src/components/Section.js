export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  addItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();

    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }
}

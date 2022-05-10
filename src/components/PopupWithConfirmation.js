import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setHandler = (handleFormSubmit) => {
    this._handleFormSubmit = handleFormSubmit;
  };

  _handleSubmit = () => {
    this._handleFormSubmit();
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmit();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

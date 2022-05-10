import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._buttonSubmitTemp = this._buttonSubmit.textContent;
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  loading(isLoad) {
    if (isLoad) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitTemp;
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  _handleSubmit = () => {
    this._handleFormSubmit(this._getInputValues());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}

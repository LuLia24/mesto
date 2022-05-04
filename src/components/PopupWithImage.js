import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__image');
    this._popupImgText = this._popup.querySelector('.popup__image-text');
  }

  open(img, text) {
    this._popupImg.src = img;
    this._popupImg.alt = text;
    this._popupImgText.textContent = text;
    super.open();
  }
}

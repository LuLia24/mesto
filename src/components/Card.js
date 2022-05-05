class Card {
  constructor(card, templateElementSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateElementSelector = templateElementSelector;
    this._handleCardClick = handleCardClick;
    // this._popupImgResize = popupImgResize;
    // this._popupImg = this._popupImgResize.querySelector('.popup__image');
    // this._popupImgText = this._popupImgResize.querySelector('.popup__image-text');
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateElementSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    return templateElement;
  }

  createElement() {
    this._cardElement = this._getTemplate();
    this._buttonLike = this._cardElement.querySelector('.element__button-like');
    this._elementImage = this._cardElement.querySelector('.element__photo');
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._cardElement.querySelector('.element__caption-text').textContent = this._name;
    this._addListeners();
    return this._cardElement;
  }

  _addListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
    this._cardElement.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteElement();
    });
    this._elementImage.addEventListener('click', () => {
      // this._resizeImg();

      this._handleCardClick(this._link, this._name);
    });
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('element__button-like_active');
  }

  _deleteElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _resizeImg() {
  //   this._popupImg.src = this._link;
  //   this._popupImg.alt = this._name;
  //   this._popupImgText.textContent = this._name;
  //   this._openPopup(this._popupImgResize);
  // }
}

export default Card;

class Card {
  constructor(userId, card, templateElementSelector, handleCardClick, handleCardDel, handleLike) {
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._userId = userId;
    this._ownerId = card.owner._id;
    this._cardId = card._id;
    this._templateElementSelector = templateElementSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDel = handleCardDel;
    this._handleLike = handleLike;
  }

  isLiked() {
    return !this._likes.every((item) => {
      return item._id !== this._userId;
    });
  }

  toggleLike(likes) {
    this._likes = likes;
    this._elementLikeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add('element__button-like_active');
    } else {
      this._buttonLike.classList.remove('element__button-like_active');
    }
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
    this._elementLikeCounter = this._cardElement.querySelector('.element__like-counter');
    this._elementDelButton = this._cardElement.querySelector('.element__trash');
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this.toggleLike(this._likes);
    this._cardElement.querySelector('.element__caption-text').textContent = this._name;
    this._addListeners();

    if (this._userId !== this._ownerId) {
      this._elementDelButton.style.display = 'none';
    }

    return this._cardElement;
  }

  _addListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike(this._cardId);
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
    this._elementDelButton.addEventListener('click', () => {
      this._handleCardDel(this._cardId);
    });
  }

  deleteElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}

export default Card;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const popupEditor = document.querySelector(".popup_name_editor");
const popupAdd = document.querySelector(".popup_name_add");
const closeButtonEditor = document.querySelector(".popup__close-icon_name_editor");
const closeButtonAdd = document.querySelector(".popup__close-icon_name_add");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const inputTitle = document.querySelector(".popup__input_type_title");
const inputLink = document.querySelector(".popup__input_type_link");
const popupFormEditor = document.querySelector(".popup__form_name_editor");
const popupFormAdd = document.querySelector(".popup__form_name_add");
const templateElement = document.querySelector(".template__element").content;
const elementsContainer = document.querySelector(".elements__container");

const addButton = document.querySelector(".profile__add-button");
const popupImg = document.querySelector(".popup__image");
const popupImgText = document.querySelector(".popup__image-text");
const popupImgResize = document.querySelector(".popup_name_resize");
const closeButtonResize = document.querySelector(".popup__close-icon_name_resize");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("click", closePopupByOverlay);
}

function submitUser(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(popupEditor);
}

function submitAdd(evt) {
  evt.preventDefault();
  renderElement({ name: inputTitle.value, link: inputLink.value });
  closePopup(popupAdd);
  popupFormAdd.reset();
}

function togleLike(evt) {
  evt.target.classList.toggle("element__button-like_active");
}

function deleteElement(evt) {
  evt.target.closest(".element").remove();
}

function resizeImg(evt) {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupImgText.textContent = evt.target.alt;
  openPopup(popupImgResize);
}

function addListeners(userElement) {
  userElement.querySelector(".element__button-like").addEventListener("click", togleLike);
  userElement.querySelector(".element__trash").addEventListener("click", deleteElement);
  userElement.querySelector(".element__photo").addEventListener("click", resizeImg);
}

function createElement(newElement) {
  const userElement = templateElement.cloneNode(true);
  const elementImage = userElement.querySelector(".element__photo");
  elementImage.alt = newElement.name;
  elementImage.src = newElement.link;
  userElement.querySelector(".element__caption-text").textContent = newElement.name;
  addListeners(userElement);
  return userElement;
}

function renderElement(element) {
  elementsContainer.prepend(createElement(element));
}

function renderAllElement(initialCards) {
  initialCards.forEach(renderElement);
}

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(document.querySelector(".popup_opened"));
  }
};

editButton.addEventListener("click", () => {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(popupEditor);
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

closeButtonEditor.addEventListener("click", () => {
  closePopup(popupEditor);
});

closeButtonAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});
closeButtonResize.addEventListener("click", () => {
  closePopup(popupImgResize);
});

popupFormEditor.addEventListener("submit", submitUser);
popupFormAdd.addEventListener("submit", submitAdd);

renderAllElement(initialCards);

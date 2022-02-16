const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-icon');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__input[name="profile__user-name"]');
const inputJob = document.querySelector('.popup__input[name="profile__user-job"]');
const popupForm = document.querySelector('.popup__form')


function openPopup() {
popup.classList.add('popup_opened');
inputName.value = userName.textContent;
inputJob.value = userJob.textContent;
}

function closePopup() {
popup.classList.remove('popup_opened');
}

function submitUser(evt) {
    evt.preventDefault()
    userName.textContent =  inputName.value;
    userJob.textContent = inputJob.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitUser);




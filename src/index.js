import "./styles/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";

const cardsList = document.querySelector(".places__list");
const cardTemplateID = "#card-template";
const cardElemClass = ".card";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// @todo: Вывести карточки на страницу
function addCardToPage() {
  initialCards.forEach((card) => {
    const cardElem = createCard(
      card,
      cardTemplateID,
      cardElemClass,
      deleteCard,
      likeCard,
      showImage
    );
    cardsList.append(cardElem);
  });
}

addCardToPage();

// Работа с popup
// Редактирование профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEditCloseButton = popupTypeEdit.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Находим форму в DOM
//const formElement = popupTypeEdit.querySelector('.popup__form');
const editProfileFormElement = document.forms["edit-profile"];
// Находим поля формы в DOM
const nameInput = editProfileFormElement.elements.name;
const jobInput = editProfileFormElement.elements.description;

profileEditButton.addEventListener("click", () => {
  putMeaningsToEditProfilePopup();
  openPopup(popupTypeEdit);
  clearValidation(editProfileFormElement, validationConfig);
});
popupTypeEditCloseButton.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

function putMeaningsToEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closePopup(popupTypeEdit);
}

editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Добавление нового места
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCardCloseButton =
  popupTypeNewCard.querySelector(".popup__close");

// Находим форму в DOM
//const newCardFormElement = popupTypeNewCard.querySelector('.popup__form');
const newCardFormElement = document.forms["new-place"];

// Находим поля формы в DOM
//const cardNameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
//const pictureUrlInput = popupTypeNewCard.querySelector('.popup__input_type_url');
const cardNameInput = newCardFormElement.elements["place-name"];
const pictureUrlInput = newCardFormElement.elements.link;

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
  newCardFormElement.reset();
  clearValidation(newCardFormElement, validationConfig);
});
popupTypeNewCardCloseButton.addEventListener("click", () => {
  closePopup(popupTypeNewCard);
});

function addCardToCardsList(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = pictureUrlInput.value;

  initialCards.unshift({ name, link });
  const cardElem = createCard(
    initialCards[0],
    cardTemplateID,
    cardElemClass,
    deleteCard,
    likeCard,
    showImage
  );
  cardsList.prepend(cardElem);
  newCardFormElement.reset();
  closePopup(popupTypeNewCard);
}

newCardFormElement.addEventListener("submit", addCardToCardsList);


// Увеличение изображения на карточке
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageCloseButton = popupTypeImage.querySelector(".popup__close");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

popupTypeImageCloseButton.addEventListener("click", () => {
  closePopup(popupTypeImage);
});

function showImage(link, name) {
    openPopup(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
}



const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const getValdationMessage = (inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    getValdationMessage(inputElement);
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(
        formElement, 
        inputElement, 
        validationConfig.inputErrorClass,
        validationConfig.errorClass
      );
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

const clearValidation = (profileForm, validationConfig) => {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideInputError(
      profileForm, 
      inputElement, 
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);



// @todo: Темплейт карточки
function getTemplate(templateID) {
  return document.querySelector(templateID).content;
}

// @todo: DOM узлы
function getElemFromTemplate(elemTemplate, elemClass) {
  return elemTemplate.querySelector(elemClass).cloneNode(true);
}

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardTemplateID = '#card-template';
  const cardElemClass = '.card';
  const cardTemplate = getTemplate(cardTemplateID);
  const cardElem = getElemFromTemplate(cardTemplate, cardElemClass);

  cardElem.querySelector('.card__image').src = cardData.link;
  cardElem.querySelector('.card__image').alt = cardData.name;

  cardElem.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElem));

  return cardElem;
}

// @todo: Функция удаления карточки
function deleteCard(cardElem) {
  cardElem.remove();
}

// @todo: Вывести карточки на страницу
function addCardToPage() {
  const cardsList = document.querySelector('.places__list');
  initialCards.forEach(card => {
    let cardElem = createCard(card, deleteCard);
    cardsList.append(cardElem);
  });
}

addCardToPage();

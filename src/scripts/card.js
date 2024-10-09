
// @todo: Темплейт карточки
function getTemplate(templateID) {
  return document.querySelector(templateID).content;
}

// @todo: DOM узлы
function getElemFromTemplate(elemTemplate, elemClass) {
  return elemTemplate.querySelector(elemClass).cloneNode(true);
}

// @todo: Функция создания карточки
function createCard(
  cardData,
  cardTemplateID,
  cardElemClass,
  deleteCard,
  likeCard,
  showImage
) {
  const cardTemplate = getTemplate(cardTemplateID);
  const cardElem = getElemFromTemplate(cardTemplate, cardElemClass);

  const cardImage = cardElem.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElem.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElem));

  const likeButton = cardElem.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {showImage(cardImage.src, cardImage.alt)});

  return cardElem;
}

// @todo: Функция удаления карточки
function deleteCard(cardElem) {
  cardElem.remove();
}

// лайкнуть карточку
function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export { createCard, deleteCard, likeCard };

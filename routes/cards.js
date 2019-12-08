const cardsRout = require('express').Router();

const { createCard,getCard,deleteCard } = require('../controllers/cards');

cardsRout.post('/', createCard);
cardsRout.delete('/:cardId', deleteCard);
cardsRout.get('/', getCard);


module.exports = cardsRout;
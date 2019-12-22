const userRout = require('express').Router();


const { getUsers,findUser} = require('../controllers/users');


userRout.get('/', getUsers);
userRout.get('/:id', findUser);



module.exports = userRout;
const userRout = require('express').Router();


const { getUsers,createUser,findUser,login} = require('../controllers/users');


userRout.get('/', getUsers);
userRout.get('/:id', findUser);
userRout.post('/', createUser);
userRout.post('/ ', login);



module.exports = userRout;
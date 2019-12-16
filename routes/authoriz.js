const authRout = require('express').Router();


const { createUser,login} = require('../controllers/users');


authRout.post('/signup', createUser);
authRout.post('/signin', login);

module.exports = authRout;
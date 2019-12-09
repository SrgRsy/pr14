// импорт модели
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res) => {
  const { name, about, avatar, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create(name, about, avatar, {
      email: email,
      password: hash,
    }))
    .then(user => res.send({ data: user }))
    .catch(err => res.status(400).send({ message: 'Ошибка' }));
};


module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw ({ message: "Пользователь не найден" });
      return user;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send({ message: "Ошибка" }));
}


module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Ошибка' }));
};


module.exports.login = (req, res) => {
  const { email, password } = req.body;



User.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(res.send({ "message": "Неверные учетные данные" }));
    }

    return bcrypt.compare(password, user.password);
  })
  .then((matched) => {
    if (!matched) {
      return Promise.reject(res.send({ "message": "Неверные учетные данные" }));
    }
    return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: "7d" });
      res.send({ token },({ "message": "Пользователь авторизован" }));
    })
    .catch((err) => {
      res.status(401).send({ "message": "Ошибка" });
    });
  })
  .catch((err) => {
    res.status(401).send({ "message": "Данный пользователь не найден" })
  });
};
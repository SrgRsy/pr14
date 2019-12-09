const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { login, createUser } = require('./routes/users');
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//подключаемся к серверу монго
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});



app.post('/signin', login);
app.post('/signup', createUser);


app.use(auth);


app.use('/cards', require('./routes/cards'));
app.use((req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
})





app.listen(PORT, () => {
  console.log(`Используется порт ${PORT}`);
})



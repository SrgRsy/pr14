const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//подключаемся к серверу монго
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use((req, res, next) => {
  req.user = {
    _id: "5de32f55073cef20847d44d6"
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use( (req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
})





app.listen(PORT, () => {
    console.log(`Используется порт ${PORT}`);
})



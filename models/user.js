const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    required: true,
    maxlength: 30
  },
  avatar: {
    type: String,
    validate: {
      validator: function (str) {
        return validator.isURL(str);
      },
      message: `Эта строка должна быть URL`
    },
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function (str) {
        return validator.isEmail(str);
      },
      message: `Эта строка должна быть @Email`
    },
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8
  }

});


userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
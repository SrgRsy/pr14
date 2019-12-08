const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    minlength : 2,
    maxlength : 30,
  },
  link : {
    type : String,
    validate : {
      validator:function(str){
        return validator.isURL(str);
      },
      message :`Эта строка должна быть URL`
    },
    required : true
  },
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes : [{
    type : mongoose.Schema.Types.ObjectId,
    default : [],
    ref : 'user',

  }],
  createdAt : {
    type : Date,
    default : Date.now
  }


});


module.exports = mongoose.model('card', cardSchema);
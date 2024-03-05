const mongoose = require('mongoose');

const regSchema = mongoose.Schema({
  username: String,
  email:String,
  password: String,
  confirmPassword: String,
  name: String,
  img:  String 
});

module.exports = mongoose.model('reg', regSchema);

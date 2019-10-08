const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt = require("bcrypt");
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [EMAIL_PATTERN, "this is not a correct email"]
  },
  photo: {
    url: {type: String, default: "./../public/images/ef3b3605aeefde1f05bcfa2f74e84329.png"},
    name: {type: String, default: "avatar"}
  },
  googleID: {type: String},
  markers: [{ type : Schema.Types.ObjectId, ref: 'Place' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// userSchema.methods.checkPassword = function(password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);
module.exports = User;

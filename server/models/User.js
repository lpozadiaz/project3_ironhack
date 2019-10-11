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
    match: [EMAIL_PATTERN, "Not a correct email"]
  },
  photo: {type: String, default: "https://res.cloudinary.com/dctu91qjy/image/upload/v1569250272/sample.jpg"},
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

const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');
const Comment = require('../models/Comment');

const selectionObject = {
  "_id": true,
  "name": true,
  "location": true,
  "address": true
}

router.post('/create', upload.single("placePhoto"), (req, res, next) => {

  const {username, password, email} = req.body;
  let originalname;
  let url;

  if (req.file) {
    originalname = req.file.originalname;
    url = req.file.url;
  }

  Place.findOne({ location })
  .then( foundLocation => {
    if (foundLocation) {
      return new Comment({

      })
    };

    

    return new Place({
      username,
      password: hashPass,
      email,
      photo: {
        url,
        name: originalname
      },
    }).save();
  })
  .then( savedUser => login(req, savedUser)) // Login the user using passport
  .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
  .catch(e => next(e));
});

module.exports = router;


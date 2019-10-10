const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');

const selectionObject = {
  "_id": true,
  "name": true,
  "location": true,
  "address": true
}

router.get('/all', (req,res,next) => {
  Place
    .find()
    .select(selectionObject)
    .then(allPlaces => res.json(allPlaces))
})

module.exports = router;


const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');
const User = require('../models/User')

const placeObject = {
  "_id": true,
  "name": true,
  "location": true,
  "address": true
}

const userObject = {
  "_id": true,
  "username": true,
  "markers": true,
  "photo": true
}

router.get('/all', (req,res,next) => {
  Place
    .find()
    .select(placeObject)
    .then(allPlaces => res.json(allPlaces))
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate("markers")
    .populate({ path: "markers", populate: { path: "comments" } })
    .select(userObject)
    .then(allPlaces => res.json(allPlaces))
});

module.exports = router;


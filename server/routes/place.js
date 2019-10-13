const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const Comment = require("../models/Comment");
const User = require("../models/User");

router.post("/create", (req, res, next) => {
  const { address, latitude, longitude } = req.body;

  Place.findOne({ address })
    .then(foundLocation => {
      if (foundLocation) {
        User.findByIdAndUpdate(req.user._id, {
          $push: { markers: foundLocation._id }
        }).then(() => {
          return;
        });
      }

      return new Place({
        address,
        location: {
          coordinates: [longitude, latitude],
          type: "Point"
        }
      })
        .save()
        .then(newPlace => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { markers: newPlace._id }
          }).then(placeAdded => {
            return;
          });
        })
        .catch(error => {
          console.log(error);
        });
    })

    .then(place => res.json({ status: "Place created", place }))
    .catch(e => next(e));
});

router.post("/:placeid/new-comment", (req, res, next) => {
  let { text } = req.body;
  let { placeid } = req.params;

  if (!text) {
    res.redirect("/place/new-comment?error=empty-fields");
    return;
  }

  return new Comment({
    text,
    authorId: req.user._id
  })
    .then(newComment => {
      Place.findByIdAndUpdate(_id, {
        $push: { comments: newComment._id }
      }).then(commentAdded => {
        res.redirect(`/place/${placeid}`);
        return;
      });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;

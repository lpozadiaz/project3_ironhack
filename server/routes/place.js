const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const Comment = require("../models/Comment");
const User = require("../models/User");

router.post("/create", (req, res, next) => {
  const { address, latitude, longitude, comment } = req.body;

  Place.findOne({ address })
    .then(foundLocation => {
      if (foundLocation) {
        User.findByIdAndUpdate(req.user._id, {
          $push: { markers: foundLocation._id }
        }).then(newPlace => {
          return new Comment({
            text: comment,
            authorId: req.user._id
          })
            .save()
            .then(newComment => {
              Place.findOneAndUpdate(
                { address },
                {
                  $push: { comments: newComment._id }
                }
              ).then(commentAdded => {
                return;
              });
            });
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
          }).then(newPlace => {
            return new Comment({
              text: comment,
              authorId: req.user._id
            })
              .save()
              .then(newComment => {
                Place.findOneAndUpdate(
                  { address },
                  {
                    $push: { comments: newComment._id }
                  }
                ).then(commentAdded => {
                  return;
                });
              });
          });
        })
        .catch(error => {
          console.log(error);
        });
    })

    .then(place => res.json({ status: "Place created", place }))
    .catch(e => next(e));
});

module.exports = router;

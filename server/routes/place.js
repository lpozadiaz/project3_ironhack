const express = require("express");
const router = express.Router();
const Place = require("../models/Place");
const Comment = require("../models/Comment");
const User = require("../models/User");

router.post("/create", (req, res, next) => {
  const { address, latitude, longitude, comment, type } = req.body;

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
        type,
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

router.post("/edit", (req, res, next) => {
  const comment = req.body.comment;
  const commentId = req.body.commentId;
  // if (!comment) {
  //   next(new Error("You have to fill this field."));
  // }

  Comment.findOneAndUpdate(commentId, { text: comment})
    .then(commentUpdate => res.json({ status: "Comment updated", commentUpdate }))

    .catch(e => next(e));
});

router.put("/delete", (req, res, next) => {
  const placeId = req.body.placeId;
  const commentId = req.body.commentId;

  Comment.findByIdAndDelete(commentId._id)
    .then(commentDeleted => {
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { markers: placeId }
        },
        { new: true }
      )
        .then(userUpdated => {
          return;
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
});

module.exports = router;

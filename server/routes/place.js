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

router.put("/edit", (req, res, next) => {
  const comment = req.body.comment;
  const commentId = req.body.commentId;

  Comment.findOneAndUpdate(commentId, { text: comment }, { new: true })
    .then(commentUpdate =>
      res.json({ status: "Comment updated", commentUpdate })
    )

    .catch(e => next(e));
});

router.put("/delete", (req, res, next) => {
  const placeId = req.body.placeId;
  const commentId = req.body.commentId;

  Comment.findOneAndDelete(commentId)
    .then(commentDeleted => {
      Place.findByIdAndUpdate(
        placeId,
        { $pull: { comments: commentDeleted._id } },
        { new: true, useFindAndModify: false }
      )
        .then(placeUpdate => {
          User.findByIdAndUpdate(
            req.user._id,
            {
              $pull: { markers: placeUpdate._id }
            },
            { new: true, useFindAndModify: false }
          )
            .then(userUpdated =>
              res.json({ status: "Comment updated", userUpdate })
            )
            .catch(e => next(e));
        })

        .catch(e => next(e));
    })
    .catch(e => next(e));
});

module.exports = router;

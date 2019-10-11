const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  name: { type: String },
  address: { type: String},
  location: { type: { type: String }, coordinates: {type:[Number], unique:true} },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete doc._id;
      delete ret.__v;
      return ret;
    },
  },
  
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;

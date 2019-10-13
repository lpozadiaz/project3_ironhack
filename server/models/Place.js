const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  address: { type: String},
  location: { type: { type: String }, coordinates: {type:[Number], unique:true} },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;

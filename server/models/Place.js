const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const placeSchema = new Schema({
  address: { type: String, required: true, unique: true},
  location: { type: { type: String }, coordinates: {type:[Number], unique: true, required: true} },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  type: {type: String, enum: ["Eat","Sleep","See"], required: true},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;

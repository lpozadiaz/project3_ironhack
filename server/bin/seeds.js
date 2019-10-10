// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const Place = require('../models/Place');

const places = [
  {
    name: 'Mission Chinese Food',
    address: '171 E Broadway, New York, NY 10002',
    latlng: {
      lat: 40.713829,
      lng: -73.989667,
    },
  },
  {
    name: 'Emily',
    address: '919 Fulton St, Brooklyn, NY 11238',
    latlng: {
      lat: 40.683555,
      lng: -73.966393,
    },
  },
  {
    name: 'Kang Ho Dong Baekjeong',
    address: '1 E 32nd St, New York, NY 10016',
    latlng: {
      lat: 40.747143,
      lng: -73.985414,
    },
  },
  {
    name: "Katz's Delicatessen",
    address: '205 E Houston St, New York, NY 10002',
    latlng: {
      lat: 40.722216,
      lng: -73.987501,
    },
  },
  {
    name: "Roberta's Pizza",
    address: '261 Moore St, Brooklyn, NY 11206',
    latlng: {
      lat: 40.705089,
      lng: -73.933585,
    },
  },
  
];

require('../configs/db.config');


const placesToSave = places.map(place => ({ name: place.name, address: place.address, location: { type: 'Point', coordinates: [place.latlng.lng, place.latlng.lat] } }));

Place.create(placesToSave)
  .then(() => mongoose.disconnect());

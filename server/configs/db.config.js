const mongoose = require('mongoose');
const { DBURL } = process.env;

mongoose.Promise = Promise;
mongoose
  .connect(DBURL)
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
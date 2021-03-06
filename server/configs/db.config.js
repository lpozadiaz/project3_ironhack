const mongoose = require('mongoose');


mongoose.Promise = Promise;
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to Mongo on ${process.env.DBURL}`)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
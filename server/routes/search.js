const express = require('express');
const router  = express.Router();

router.get('/map/:placeId', (req,res,next) => {
  if(req.params){
    res.status(200).json(req.params);
  }else{
    next(new Error('Error'))
  }
})


module.exports = router;


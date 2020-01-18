const path = require('path');
const view = path.join(__dirname, '../view');
const express = require('express');
const router = express.Router({mergeParams: true});
module.exports = router;

router.use('/mobile', require('../features-mobile/router.js/mobile'));
router.get('/',(req,res)=>{
  res.json({success: true})
})
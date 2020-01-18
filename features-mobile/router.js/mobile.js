const path = require('path');
const view = path.join(__dirname, '../views');
const express = require('express');
const router = express.Router({mergeParams: true});
module.exports = router;

router.get('/', async function(req,res){
  res.render(`${view}/home`)
})
router.get('/scanner', async function(req,res){
  res.render(`${view}/scanner`);
})
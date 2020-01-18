const path = require('path');
const view = path.join(__dirname, '../views');
const express = require('express');
const router = express.Router({mergeParams: true});
const delay = require('delay');
module.exports = router;

router.get('/', async function(req,res){
  res.render(`${view}/home`)
})
router.get('/scanner', async function(req,res){
  res.render(`${view}/scanner`);
})

const Package_Open = require('../../features-packages/server/package_reciept')
router.post('/scanner', async function(req,res){
  let data = await Package_Open.log({customer_number: req.body.customer_number});
  console.log(req.body);
  res.json({'success': true})
})
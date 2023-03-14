var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('aboutus');
});
router.get('/cant', function(req,res, next){
  res.render('cant');
  
});

router.get('/cuina', function(req,res, next){
  res.render('cuina');
  
});

router.get('/tenis', function(req,res, next){
  res.render('tenis');
  
});
module.exports = router;

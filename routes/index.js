var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Amazing Prize-O-Tron' });
});

module.exports = router;

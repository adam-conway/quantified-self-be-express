var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/v1/foods', function(req, res, next) {
  res.send('respond with a resource');
});

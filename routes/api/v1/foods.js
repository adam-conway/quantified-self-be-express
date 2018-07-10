var express = require('express');
var router = express.Router();

const Food = require('../../../models/food.js')

/* GET foods listing. */
router.get('/', function(req, res, next) {
  Food.all()
  .then((data) => {
    res.status(201).json(data.rows)
  })
});

module.exports = router;

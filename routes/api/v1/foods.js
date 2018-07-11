var express = require('express');
var router = express.Router();

const Food = require('../../../models/food.js')

/* GET foods listing. */
router.get('/', function(req, res, next) {
  Food.all()
  .then((data) => {
    res.status(200).json(data.rows)
  })
});

/* GET single food listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  Food.find(id)
  .then((data) => {
    res.status(200).json(data.rows)
  })
});

module.exports = router;

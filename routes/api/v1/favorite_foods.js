var express = require('express');
var router = express.Router();

const FavoriteFood = require('../../../models/favorite_food.js')

/* GET favorite foods listing. */
router.get('/', function(req, res, next) {
  FavoriteFood.all()
  .then((data) => {
    res.status(200).json(data.rows)
  })
});

module.exports = router;

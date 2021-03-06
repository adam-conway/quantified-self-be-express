var express = require('express');
var router = express.Router();
var pry = require('pryjs')

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

/* POST food. */
router.post('/', function(req, res, next) {
  var attributes = req.body.food;

  Food.create(attributes)
  .then((data) => {
    res.status(200).json(data.rows[0])
  })
});

/* UPDATE food. */
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var attributes = req.body.food;

  Food.update(attributes, id)
  .then((data) => {
    res.status(200).json(data.rows[0])
  })
});

/* DELETE food. */
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  Food.remove(id)
  .then((data) => {
    res.status(200).json(data.rows[0])
  })
});

/* GET Yummly recipes food. */
router.get('/:id/recipes', function(req, res, next) {
  var id = req.params.id;

  Food.find(id)
    .then((food) => {
      return Food.get_recipes(food)
    })
    .then((data) => {
      res.json({'recipes': data})
    })
});

module.exports = router;

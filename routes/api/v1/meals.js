var express = require('express');
var router = express.Router();

const Meal = require('../../../models/meal.js')
const MealFood = require('../../../models/meal_food.js')

/* GET meals listing. */
router.get('/', function(req, res, next) {
  Meal.all()
  .then((data) => {
    res.status(200).json(data.rows)
  })
});

/* GET single meal listing. */
router.get('/:id/foods', function(req, res, next) {
  var id = req.params.id;

  Meal.find(id)
  .then((data) => {
    res.status(200).json(data.rows)
  })
});

/* CREATE meal food */
router.post('/:meal_id/foods/:food_id', function(req, res, next) {
  var meal_id = req.params.meal_id;
  var food_id = req.params.food_id;

  MealFood.create(meal_id, food_id)
  .then((data) => {
    res.status(200).json(data.rows)
  })
});

module.exports = router;

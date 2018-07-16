const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const all = () => {
  return database.raw(
    `SELECT count(foods.id) AS timesEaten,
        COALESCE(json_agg(json_build_object('name', foods.name, 'calories', foods.calories)) FILTER (WHERE foods.id IS NOT NULL), '[]') AS foods
        FROM meal_foods
        LEFT JOIN foods ON meal_foods.food_id = foods.id
        GROUP BY foods.id
        ORDER BY timesEaten;`
  );
};

module.exports = {
  all
}

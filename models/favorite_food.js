const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const all = () => {
  return database.raw(
    `SELECT timesEaten,
            json_agg(json_build_object('name', name, 'calories', calories)) AS foods
     FROM
         (
           SELECT DISTINCT foods.name, foods.calories, COUNT(foods.id) AS timesEaten
           FROM foods
           JOIN meal_foods ON foods.id = meal_foods.food_id
           GROUP BY foods.id
           ORDER BY timesEaten DESC
         ) connectingStuffs
     GROUP BY timesEaten
     ORDER BY timesEaten DESC`
  );
};

module.exports = {
  all
}

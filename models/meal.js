const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const all = () => {
  return database.raw(
    `SELECT meals.*,
        COALESCE(json_agg(foods.*) FILTER (WHERE foods.id IS NOT NULL), '[]') AS foods
        FROM meals
        LEFT JOIN meal_foods ON meals.id = meal_foods.meal_id
        LEFT JOIN foods ON meal_foods.food_id = foods.id
        GROUP BY meals.id;`
  );
};


const find = (meal_id) => {
  var meal_id = meal_id;
  return database.raw(
    `SELECT meals.*,
        json_agg(foods.*) FILTER (WHERE foods.id IS NOT NULL) AS foods
        FROM meals
        LEFT JOIN meal_foods ON meals.id = meal_foods.meal_id
        LEFT JOIN foods ON meal_foods.food_id = foods.id
        WHERE meals.id = ?
        GROUP BY meals.id;`,
        meal_id
  );
};
//
// const create = (attributes) => {
//   let name = attributes.name;
//   let calories = attributes.calories;
//
//   return database.raw(
//     'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories;', [name, calories]
//   );
// };
//
// const update = (attributes, id) => {
//   let name = attributes.name;
//   let calories = attributes.calories;
//
//   return database.raw(
//     'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING id, name, calories;', [name, calories, id]
//   );
// };
//
// const remove = (id) => {
//   return database.raw(
//     'DELETE FROM foods WHERE id = ? RETURNING id, name, calories;', id
//   );
// };

module.exports = {
  all, find
}

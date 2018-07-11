const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const all = () => {
  return database.raw(
    'SELECT foods.id, foods.name, foods.calories FROM foods;'
  );
};

const find = (food_id) => {
  var food_id = food_id;
  return database.raw(
    'SELECT foods.id, foods.name, foods.calories FROM foods WHERE foods.id = ?;', food_id
  );
};

const create = (attributes) => {
  let name = attributes.name;
  let calories = attributes.calories;

  return database.raw(
    'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories;', [name, calories]
  );
};

const update = (attributes, id) => {
  let name = attributes.name;
  let calories = attributes.calories;

  return database.raw(
    'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING id, name, calories;', [name, calories, id]
  );
};

module.exports = {
  all, find, create, update
}

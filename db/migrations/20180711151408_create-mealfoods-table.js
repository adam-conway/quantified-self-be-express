
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meal_foods(
    id SERIAL PRIMARY KEY NOT NULL,
    meal_id INT REFERENCES meals(id) ON DELETE CASCADE,
    food_id INT REFERENCES foods(id) ON DELETE CASCADE
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meal_foods`
  return knex.raw(dropQuery)
};

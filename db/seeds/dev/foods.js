
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Cheese", 50]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Cake", 100]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["Pizza", 535]
        )
      ])
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex.raw(
          'INSERT INTO meals (name) VALUES (?)',
          ["breakfast"]
        ),
        knex.raw(
          'INSERT INTO meals (name) VALUES (?)',
          ["snack"]
        ),
        knex.raw(
          'INSERT INTO meals (name) VALUES (?)',
          ["lunch"]
        ),
        knex.raw(
          'INSERT INTO meals (name) VALUES (?)',
          ["dinner"]
        )
      ])
    });
};

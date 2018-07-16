const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
var pry = require('pryjs')
var express = require('express');
require('isomorphic-fetch');

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

const remove = (id) => {
  return database.raw(
    'DELETE FROM foods WHERE id = ? RETURNING id, name, calories;', id
  );
};

const get_recipes = (food_name) => {
  var food_name = food_name;
  eval(pry.it)

  fetch(`http://api.yummly.com/v1/api/recipes?_app_id=ce293de6&_app_key=d48c3172a1d1d6d3f97b3faf5ad6fd33&q=${food_name}`)
    .then(handleResponse)

};

function handleResponse(response) {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        }
        return Promise.reject(error)
      }
      return json
    })
}

module.exports = {
  all, find, create, update, remove, get_recipes
}

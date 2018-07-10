const all = () => {
  return database.raw(
    'SELECT foods.id, foods.name, foods.calories FROM foods;'
  );
};

export const calculatePrice = (
  doughPrice,
  saucePrice,
  ingredientsPrice,
  multiplier
) => {
  return (ingredientsPrice + doughPrice + saucePrice) * multiplier;
};
export const calculateIngredientsPrice = (ingredients) => {
  return ingredients.reduce(
    (acc, ingredient) => acc + ingredient.count * ingredient.price,
    0
  );
};

export const calculatePizzaPrice = (pizza) => {
  const { dough, sauce, size, ingredients } = pizza;
  const ingredientsPrice = calculateIngredientsPrice(ingredients);
  return calculatePrice(
    dough.price,
    sauce.price,
    ingredientsPrice,
    size.multiplier
  );
};

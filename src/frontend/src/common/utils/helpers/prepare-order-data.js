import { calculatePizzaPrice } from "./calculate";

const findIngredients = (orderIngredients, ingredients) => {
  return orderIngredients.map((item) => {
    const { quantity, ingredientId } = item;
    const ingredient = ingredients.find((i) => i.id === +ingredientId);
    return {
      ...ingredient,
      count: quantity,
    };
  });
};

export const preparePizza = async (
  orderPizza,
  sauces,
  dough,
  sizes,
  ingredients
) => {
  const {
    doughId,
    ingredients: orderIngredients,
    name,
    sauceId,
    quantity,
    sizeId,
  } = orderPizza;

  const pizza = {
    name,
    count: quantity,
    dough: dough.find((i) => +i.id === +doughId),
    size: sizes.find((i) => +i.id === +sizeId),
    sauce: sauces.find((i) => +i.id === +sauceId),
    ingredients: findIngredients(orderIngredients, ingredients),
  };

  const price = calculatePizzaPrice(pizza);

  return {
    ...pizza,
    price,
  };
};

export const prepareAdditional = async (loadedAdditional, orderMisc) => {
  let additionalPrice = 0;

  if (!orderMisc) {
    return { additional: [], additionalPrice };
  }

  const additional = await Promise.all(
    orderMisc.map(async (misc) => {
      const { miscId, quantity } = misc;
      const item = loadedAdditional.find((i) => i.id === +miscId);
      if (item) {
        additionalPrice += item.price * quantity;
        return {
          ...item,
          count: quantity,
        };
      }
    })
  );

  return { additional, additionalPrice };
};

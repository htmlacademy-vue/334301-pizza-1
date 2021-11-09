const preparePizza = (pizza) => {
  const { name, count, sauce, dough, size, ingredients: items } = pizza;

  const ingredients = items.map((item) => ({
    ingredientId: item.id,
    quantity: item.count,
  }));

  return {
    name: name,
    sauceId: sauce.id,
    doughId: dough.id,
    sizeId: size.id,
    quantity: count,
    ingredients,
  };
};

const prepareMisc = (miscItems) => {
  return miscItems
    .filter((item) => +item.count !== 0)
    .map((misc) => ({
      miscId: misc.id,
      quantity: misc.count,
    }));
};

export const prepareOrder = (store) => {
  const pizzaItems = store.getters["cart/getItems"];
  const miscItems = store.getters["cart/getAdditional"];
  const user = store.getters["auth/getUser"];

  return {
    pizzas: pizzaItems.map((pizza) => preparePizza(pizza)),
    misc: prepareMisc(miscItems),
    userId: user?.id || null,
  };
};

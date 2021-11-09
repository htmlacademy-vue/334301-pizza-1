export const mockPizza1 = {
  name: "Pizza",
  count: 2,
  price: 383,
  dough: {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    class: "dough__input dough__input--light",
    price: 300,
  },
  sauce: {
    id: 1,
    name: "Томатный",
    price: 50,
  },
  size: {
    class: "diameter__input diameter__input--small",
    id: 1,
    image: "/public/img/diameter.svg",
    multiplier: 1,
    name: "23 см",
  },
  ingredients: [
    {
      class: "filling--mushrooms",
      count: 1,
      id: 1,
      image: "/public/img/filling/mushrooms.svg",
      name: "Грибы",
      price: 33,
    },
  ],
};

export const mockPizza2 = {
  name: "Pizza 2",
  count: 1,
  price: 467,
  dough: {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    class: "dough__input dough__input--light",
    price: 300,
  },
  sauce: {
    id: 1,
    name: "Томатный",
    price: 50,
  },
  size: {
    class: "diameter__input diameter__input--small",
    id: 1,
    image: "/public/img/diameter.svg",
    multiplier: 1,
    name: "23 см",
  },
  ingredients: [
    {
      class: "filling--mushrooms",
      count: 1,
      id: 1,
      image: "/public/img/filling/mushrooms.svg",
      name: "Грибы",
      price: 33,
    },
    {
      class: "filling--cheddar",
      id: 2,
      count: 2,
      name: "Чеддер",
      image: "/public/img/filling/cheddar.svg",
      price: 42,
    },
  ],
};

export const mockAdditional = [
  {
    count: 1,
    id: 1,
    name: "Cola-Cola 0,5 литра",
    image: "/public/img/cola.svg",
    price: 56,
  },
  {
    count: 2,
    id: 3,
    name: "Картошка из печи",
    image: "/public/img/potato.svg",
    price: 170,
  },
];

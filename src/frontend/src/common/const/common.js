export const INGREDIENT_MIN_COUNT = 0;
export const INGREDIENT_MAX_COUNT = 3;
export const SEC = 1000;
export const MESSAGE_LIVE_TIME = 3 * SEC;

export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const TOKEN_KEY = "token";

export const Message = {
  SERVER_ERROR: "Возникла ошибка при выполнении запроса к серверу",
  LOGOUT_SUCCESS: "Вы успешно вышли",
  PIZZA_ADD_CART: "Пицца добавлена в корзину",
  ADDRESS_ADD_SUCCESS: "Адрес добавлен",
  ADDRESS_EDIT_SUCCESS: "Адрес сохранен",
  ADDRESS_DELETE_SUCCESS: "Адрес удалён",
  ORDER_DELETE_SUCCESS: "Заказ удалён",
};

/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

export const DefaultAddress = {
  name: "Новый адрес",
  street: "",
  building: "",
  flat: " ",
  comment: "",
};

export const Transition = {
  SLIDE: "slide",
  SLIDE_LOGIN: "login-slide",
};

export const LayoutName = {
  DEFAULT: "AppLayoutDefault",
  LOGIN: "AppLayoutLogin",
  SIDE_BAR: "AppLayoutSideBar",
};

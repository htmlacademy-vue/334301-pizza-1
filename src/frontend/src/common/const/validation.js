export const LoginValidations = {
  email: {
    name: "E-mail",
    error: "",
    rules: ["required", "email"],
  },
  password: {
    name: "Пароль",
    error: "",
    rules: ["required"],
  },
};

export const AddressValidations = {
  name: {
    name: "Название адреса",
    error: "",
    rules: ["required"],
  },
  street: {
    name: "Улица",
    error: "",
    rules: ["required"],
  },
  building: {
    name: "Дом",
    error: "",
    rules: ["required"],
  },
};

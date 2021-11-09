import { getValidationErrorMessage } from "../validation";

const validations = {
  email: {
    name: "E-mail",
    error: "обязательное поле",
  },
  password: {
    name: "Пароль",
    error: "",
  },
};

describe("Тест validation()", () => {
  test('Должен вернуть "E-mail - обязательное поле"', () => {
    const message = getValidationErrorMessage(validations);
    expect(message).toBe("E-mail - обязательное поле");
  });

  test('Должен вернуть "E-mail - обязательное поле<br>Пароль - обязательное поле"', () => {
    const loginValidations = {
      ...validations,
      password: {
        name: "Пароль",
        error: "обязательное поле",
      },
    };
    const message = getValidationErrorMessage(loginValidations);
    expect(message).toBe(
      "E-mail - обязательное поле<br>Пароль - обязательное поле"
    );
  });

  test('Должен вернуть "Форма<br>E-mail - обязательное поле"', () => {
    const message = getValidationErrorMessage(validations, "Форма");
    expect(message).toBe("Форма<br>E-mail - обязательное поле");
  });

  test('Должен вернуть ""', () => {
    const loginValidations = {
      password: {
        name: "Пароль",
        error: "",
      },
    };
    const message = getValidationErrorMessage(loginValidations);
    expect(message).toBe("");
  });
});

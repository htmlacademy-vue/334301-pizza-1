import { enableAutoDestroy, shallowMount } from "@vue/test-utils";
import validator from "../validator";

const Component = {
  render() {},
  mixins: [validator],
};

enableAutoDestroy(afterEach);

describe("Тест миксин $validator - $validateFields", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component);
  });

  test("Неверный формат адреса электронной почты", () => {
    const validation = {
      email: {
        error: "",
        rules: ["required", "email"],
      },
    };

    const isVerify = wrapper.vm.$validateFields({ email: "email" }, validation);

    expect(isVerify).toBeFalsy();
    expect(validation.email.error).toBe(
      "электронная почта имеет неверный формат"
    );
  });

  test("Электронный адрес поле обязательно для заполнения", () => {
    const validation = {
      email: {
        error: "",
        rules: ["required", "email"],
      },
    };

    const isVerify = wrapper.vm.$validateFields({ email: "" }, validation);

    expect(isVerify).toBeFalsy();
    expect(validation.email.error).toBe("поле обязательно для заполнения");
  });

  test("Электронный адрес все данные правильные", () => {
    const validation = {
      email: {
        error: "",
        rules: ["required", "email"],
      },
    };

    const isVerify = wrapper.vm.$validateFields(
      { email: "email@example.com" },
      validation
    );

    expect(isVerify).toBeTruthy();
    expect(validation.email.error).toBe("");
  });

  test("поле не заполнено", () => {
    const validation = {
      password: {
        error: "",
        rules: ["isNotEmpty"],
      },
    };

    const isVerify = wrapper.vm.$validateFields({ password: "" }, validation);

    expect(isVerify).toBeFalsy();
    expect(validation.password.error).toBe("поле не заполнено");
  });

  test("для поля нет правила", () => {
    const validation = {
      password: {
        error: "поле не заполнено",
        rules: ["not-rule"],
      },
    };

    const isVerify = wrapper.vm.$validateFields(
      { password: "123" },
      validation
    );

    expect(isVerify).toBeTruthy();
    expect(validation.password.error).toBe("");
  });
});

describe("Тест миксин $validator - $clearValidationErrors", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Component);
  });

  test("Очищает ошибки", () => {
    const validation = {
      email: {
        error: "email error",
      },
      password: {
        error: "password error",
      },
    };

    wrapper.vm.$clearValidationErrors(validation);

    expect(validation.email.error).toBe("");
    expect(validation.password.error).toBe("");
  });

  test("Ничего не делает", () => {
    const validation = {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    };

    wrapper.vm.$clearValidationErrors(validation);

    expect(validation).toStrictEqual({
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    });
  });

  test("Ничего не возвращает", () => {
    expect(wrapper.vm.$clearValidationErrors(null)).toBeUndefined();
  });
});

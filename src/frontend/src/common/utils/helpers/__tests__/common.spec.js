import { capitalize, getStringProductPrice, printAddress } from "../common";

describe("Тест capitalize()", () => {
  test('Должен вернуть "Вася"', () => {
    const name = capitalize("вася");
    expect(name).toBe("Вася");
  });

  test('Должен вернуть "Белое солнце пустыни"', () => {
    const name = capitalize("белое солнце пустыни");
    expect(name).toBe("Белое солнце пустыни");
  });
});

describe("Тест getStringProductPrice()", () => {
  test('Должен вернуть "20"', () => {
    const product = {
      price: 20,
      count: 1,
    };
    const strPrice = getStringProductPrice(product);

    expect(strPrice).toBe(20);
  });

  test('Должен вернуть "3x20"', () => {
    const product = {
      price: 20,
      count: 3,
    };
    const strPrice = getStringProductPrice(product);

    expect(strPrice).toBe("3x20");
  });
});

describe("Тест printAddress()", () => {
  const address = {
    street: "Ленина",
    building: "7",
    flat: "",
  };

  test('Должен вернуть "ул. Ленина, д. 7"', () => {
    const strAddress = printAddress(address);

    expect(strAddress).toBe("ул. Ленина, д. 7");
  });

  test('Должен вернуть "ул. Ленина, д. 7, кв. 6"', () => {
    const addressWithFlat = {
      ...address,
      flat: "6",
    };
    const strAddress = printAddress(addressWithFlat);

    expect(strAddress).toBe("ул. Ленина, д. 7, кв. 6");
  });

  test('Должен вернуть "ул. Ленина, д. 7"', () => {
    const strAddress = printAddress(address);

    expect(strAddress).toBe("ул. Ленина, д. 7");
  });
});

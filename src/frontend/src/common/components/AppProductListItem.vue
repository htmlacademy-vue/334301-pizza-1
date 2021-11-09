<template>
  <div>
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    />
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>{{ product.size.name }}, {{ dough }}</li>
        <li>Соус: {{ sauce }}</li>
        <li>Начинка: {{ ingredients }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductListItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ingredients() {
      return this.product.ingredients
        .map((item) => item.name.toLowerCase())
        .join(", ");
    },
    sauce() {
      return this.product.sauce.name.toLowerCase();
    },
    dough() {
      const doughName =
        this.product.dough.name === "Тонкое" ? "тонком" : "толстом";
      return `на ${doughName} тесте`;
    },
  },
};
</script>

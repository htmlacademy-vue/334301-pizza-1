<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="this.pizza.name"
      @input="setName"
    />
  </label>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("builder", {
      pizza: "pizza",
    }),
  },
  methods: {
    setName(event) {
      const name = event.target.value;
      this.setPizzaName(name);
    },
    ...mapActions("builder", {
      setPizzaName: "setName",
    }),
  },
};
</script>

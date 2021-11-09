<template>
  <div class="content__pizza">
    <slot name="pizzaName" />

    <div class="content__constructor">
      <AppDrop
        class="pizza"
        :class="pizzaFoundationClass"
        @drop="addIngredient"
      >
        <div class="pizza__wrapper">
          <transition-group name="ingredients">
            <div
              v-for="ingredient in pizza.ingredients"
              class="pizza__filling"
              :key="ingredient.id"
              :class="getFillingClass(ingredient)"
            />
          </transition-group>
        </div>
      </AppDrop>
    </div>

    <slot name="pizzaPrice" />
  </div>
</template>

<script>
import AppDrop from "../../../common/components/AppDrop";
import { mapGetters, mapActions } from "vuex";

const CLASS_FOUNDATION_PREFIX = "pizza--foundation";
const PIZZA_FILLING_SECOND = "pizza__filling--second";
const PIZZA_FILLING_THIRD = "pizza__filling--third";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  methods: {
    ...mapActions("builder", {
      setIngredient: "setIngredient",
    }),
    addIngredient(ingredient) {
      const ingredientId = ingredient.id;
      const count = ingredient.count + 1;
      this.setIngredient({ ingredientId, count });
    },

    getFillingClass(ingredient) {
      const className = `pizza__${ingredient.class}`;

      switch (ingredient.count) {
        case 1:
          return className;
        case 2:
          return `${className} ${PIZZA_FILLING_SECOND}`;
        case 3:
          return `${className} ${PIZZA_FILLING_THIRD}`;
      }
    },
  },
  computed: {
    ...mapGetters("builder", {
      pizza: "pizza",
    }),
    pizzaFoundationClass: function () {
      const {
        dough: { name: doughName },
        sauce: { name: sauceName },
      } = this.pizza;

      const size = doughName === "Толстое" ? "big" : "small";
      const sauce = sauceName === "Томатный" ? "tomato" : "creamy";

      return `${CLASS_FOUNDATION_PREFIX}--${size}-${sauce}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.ingredients-enter-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

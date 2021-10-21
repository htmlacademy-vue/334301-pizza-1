<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :currentDough="currentPizza.dough"
            @changeDough="onPizzaUpdate"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :currentSize="currentPizza.size"
            @changeSize="onPizzaUpdate"
          />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :currentIngridients="currentPizza.ingredients"
            @changeSauce="onSauceUpdate"
            @changeSubingrident="onSubIngridentUpdate"
            @ingrideintDragged="onIngridientDrag"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView
            :currentPizza="currentPizza"
            @changeSize="onPizzaUpdate"
            @ingridientDropped="onIngridientDrop"
          />

          <BuilderPriceCounter :currentPrice="currentPizza.price.value" />
        </div>
      </div>
    </form>

    <router-view />
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderSizeSelector,
  },
  data() {
    return {
      misc,
      pizza,
      user,
      currentPizza: {
        dough: {
          name: "dough",
          value: "light",
        },
        ingredients: {
          sauce: {
            name: "sauce",
            value: "tomato",
          },
          subIngridients: [
            {
              name: "mushrooms",
              text: "Грибы",
              value: 0,
            },
            {
              name: "cheddar",
              text: "Чеддер",
              value: 0,
            },
            {
              name: "salami",
              text: "Салями",
              value: 0,
            },
            {
              name: "ham",
              text: "Ветчина",
              value: 0,
            },
            {
              name: "ananas",
              text: "Ананас",
              value: 0,
            },
            {
              name: "bacon",
              text: "Бекон",
              value: 0,
            },
            {
              name: "onion",
              text: "Лук",
              value: 0,
            },
            {
              name: "chile",
              text: "Чили",
              value: 0,
            },
            {
              name: "jalapeno",
              text: "Халапеньо",
              value: 0,
            },
            {
              name: "olives",
              text: "Маслины",
              value: 0,
            },
            {
              name: "tomatoes",
              text: "Томаты",
              value: 0,
            },
            {
              name: "salmon",
              text: "Лосось",
              value: 0,
            },
            {
              name: "mozzarella",
              text: "Моцарелла",
              value: 0,
            },
            {
              name: "parmesan",
              text: "Пармезан",
              value: 0,
            },
            {
              name: "blue_cheese",
              text: "Блю чиз",
              value: 0,
            },
          ],
        },
        size: {
          name: "size",
          value: "small",
        },
        title: {
          name: "title",
          value: "",
        },
        price: {
          name: "price",
          value: 0,
        },
      },
      draggedIngridientIndex: -1,
    };
  },
  methods: {
    onPizzaUpdate(key, newValue) {
      this.currentPizza[`${key}`].value = newValue;
    },
    onSauceUpdate(key, newValue) {
      this.currentPizza.ingredients[`${key}`].value = newValue;
    },
    onSubIngridentUpdate(ingridientIndex, delta) {
      this.currentPizza.ingredients.subIngridients[ingridientIndex].value +=
        delta;
    },
    onIngridientDrag(ingridientIndex) {
      this.draggedIngridientIndex = ingridientIndex;
    },
    onIngridientDrop() {
      if (
        this.currentPizza.ingredients.subIngridients[
          this.draggedIngridientIndex
        ].value < 3
      ) {
        this.currentPizza.ingredients.subIngridients[
          this.draggedIngridientIndex
        ].value += 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/title";
</style>

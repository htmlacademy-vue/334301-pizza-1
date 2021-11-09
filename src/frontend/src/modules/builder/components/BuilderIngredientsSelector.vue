<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <slot />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :draggable="isDraggable(ingredient)"
              >
                <span :class="['filling', ingredient.class]">
                  {{ ingredient.name }}
                </span>
              </AppDrag>

              <ItemCounter
                :item-id="ingredient.id"
                :count="ingredient.count"
                @setCount="setCount"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCounter from "../../../common/components/AppItemCounter";
import AppDrag from "../../../common/components/AppDrag";
import { INGREDIENT_MAX_COUNT } from "../../../common/const/common";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, AppDrag },
  computed: {
    ...mapGetters("builder", {
      ingredients: "ingredients",
      pizza: "pizza",
    }),
  },
  methods: {
    ...mapActions("builder", {
      setIngredient: "setIngredient",
    }),
    setCount(ingredientId, count) {
      this.setIngredient({ ingredientId, count });
    },
    isDraggable(ingredient) {
      return ingredient.count < INGREDIENT_MAX_COUNT;
    },
  },
};
</script>

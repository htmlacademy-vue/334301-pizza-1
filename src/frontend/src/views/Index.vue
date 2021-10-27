<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper" v-if="currentPizza !== null">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector :currentDough="currentPizza.dough" />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector :currentSize="currentPizza.size" />
        </div>

        <div class="content__ingridients">
          <BuilderIngredientsSelector
            :currentIngridients="currentPizza.ingredients"
            @ingrideintDragged="onIngridientDrag"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaView
            :currentPizza="currentPizza"
            @ingridientDropped="onIngridientDrop"
          />

          <BuilderPriceCounter />
        </div>
      </div>
    </form>

    <router-view />
  </main>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";

import { UPDATE_PIZZA_SUBINGRIDIENT } from "@/store/mutation-types.js";

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
      draggedIngridientIndex: -1,
    };
  },
  computed: {
    ...mapState("Builder", ["currentPizza"]),
  },
  methods: {
    ...mapMutations("Builder", {
      handelSubIngridentUpdate: UPDATE_PIZZA_SUBINGRIDIENT,
    }),
    onIngridientDrag(ingridientIndex) {
      this.draggedIngridientIndex = ingridientIndex;
    },
    onIngridientDrop() {
      const ingridientIndex = this.draggedIngridientIndex;

      this.handelSubIngridentUpdate({ ingridientIndex, delta: 1 });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins";
@import "~@/assets/scss/layout/content";

@import "~@/assets/scss/blocks/title";
</style>

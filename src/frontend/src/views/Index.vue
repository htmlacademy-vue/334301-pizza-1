<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector />

        <BuilderSizeSelector />

        <BuilderIngredientsSelector>
          <BuilderSauceSelector />
        </BuilderIngredientsSelector>

        <BuilderPizzaView>
          <template #pizzaName>
            <BuilderPizzaName />
          </template>

          <template #pizzaPrice>
            <BuilderPriceCounter />
          </template>
        </BuilderPizzaView>
      </div>
    </form>
    <transition appear name="modal">
      <router-view />
    </transition>
  </main>
</template>

<script>
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";
import BuilderSauceSelector from "../modules/builder/components/BuilderSauceSelector";
import BuilderPizzaName from "../modules/builder/components/BuilderPizzaName";

export default {
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderSauceSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaName,
  },
};
</script>

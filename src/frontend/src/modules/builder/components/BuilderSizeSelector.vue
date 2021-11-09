<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label v-for="size in sizes" :key="size.id" :class="size.class">
          <RadioButton
            name="diameter"
            class="visually-hidden"
            :value="size.name"
            :checked="size.id === pizza.size.id"
            @handleChoice="setSize"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/AppRadioButton";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  computed: {
    ...mapGetters("builder", {
      sizes: "sizes",
      pizza: "pizza",
    }),
  },
  methods: {
    ...mapActions("builder", {
      setPizzaSize: "setSize",
    }),
    setSize(sizeName) {
      this.setPizzaSize(sizeName);
    },
  },
};
</script>

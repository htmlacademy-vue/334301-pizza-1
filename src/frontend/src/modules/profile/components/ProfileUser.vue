<template>
  <div class="user" v-if="user !== null">
    <img :src="user.avatar" :alt="user.name" width="72" height="72" />
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileUser",
  computed: {
    ...mapState("Auth", ["user"]),
  },
};
</script>

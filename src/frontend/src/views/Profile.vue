<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <ProfileUser />

    <ProfileAddress />
  </div>
</template>

<script>
import ProfileUser from "@/modules/profile/components/ProfileUser";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";

export default {
  name: "Profile",
  components: {
    ProfileUser,
    ProfileAddress,
  },
};
</script>

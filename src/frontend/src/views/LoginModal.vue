<template>
  <Modal>
    <transition appear name="login-slide">
      <Login />
    </transition>
  </Modal>
</template>
<script>
import Modal from "../common/components/AppModal";
import Login from "./Login";

export default {
  components: { Modal, Login },
};
</script>

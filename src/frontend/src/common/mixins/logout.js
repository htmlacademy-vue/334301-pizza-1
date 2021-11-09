import { Message } from "../const/common";
import { AppRoute } from "../const/route";

export default {
  methods: {
    async $logout() {
      await this.$router.push(AppRoute.MAIN);
      await this.$store.dispatch("auth/logout");
      this.$notifier.success(Message.LOGOUT_SUCCESS);
    },
  },
};

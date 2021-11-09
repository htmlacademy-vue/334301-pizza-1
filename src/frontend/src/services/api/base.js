import axios from "../../plugins/axios";

export class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

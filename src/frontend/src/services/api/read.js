import axios from "../../plugins/axios";
import { BaseApiService } from "./base";

export default class ReadApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  async get(resource) {
    const { data } = await axios.get(resource);
    return data;
  }
}

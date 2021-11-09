import axios from "../../plugins/axios";
import { BaseApiService } from "./base";

export default class CrudApiService extends BaseApiService {
  constructor(resource, notifier) {
    super(resource, notifier);
    this._resource = resource;
  }

  _resource;

  async get() {
    const { data } = await axios.get(this._resource);
    return data;
  }

  async post(entity) {
    const { data } = await axios.post(this._resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this._resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this._resource}/${id}`);
    return data;
  }
}

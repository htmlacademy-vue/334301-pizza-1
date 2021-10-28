import axios from "@/plugins/axios";
import JwtService from "@/services/jwt.service";

export class ReadOnlyApiService {
  constructor(resource) {
    this.resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.resource, config);

    return data;
  }
}

export class AuthApiService {
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);

    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");

    return data;
  }

  async getMe() {
    if (!JwtService.getToken()) {
      return null;
    }

    this.setAuthHeader();

    const { data } = await axios.get("whoAmI");

    return data;
  }
}

export class AddressApiService {
  async get() {
    const { data } = await axios.get("addresses");

    return data;
  }

  async post(newAddress) {
    const { data } = await axios.post("addresses", newAddress);
    return data;
  }

  async put(updatedAddress) {
    const { data } = await axios.put(
      `addresses/${updatedAddress.id}`,
      updatedAddress
    );

    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`addresses/${id}`);
    return data;
  }
}

export class OrdersApiService {
  async get() {
    const { data } = await axios.get("orders");

    return data;
  }

  async post(newOrder) {
    const { data } = await axios.post("orders", newOrder);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`orders/${id}`);
    return data;
  }
}

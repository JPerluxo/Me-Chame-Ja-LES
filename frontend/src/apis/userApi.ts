import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const userApi = {
  saveUser: async function (userObject: any, cancel = false) {
    const response = await api.request({
      url: "/user/save",   
      method: "POST",
      data: userObject,
      headers: { "Content-Type": "application/json" },
      signal: cancel
        ? cancelApiObject[this.saveUser.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  getUsers: async function (cancel = false) {
    const response = await api.request({
      url: "/user/getAll",  
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getUsers.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  getUserById: async function (id: number, cancel = false) {
    const response = await api.request({
      url: `/user/getById?id=${id}`, 
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getUserById.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  updateUser: async function (userObject: any, cancel = false) {
    const response = await api.request({
      url: "/user/update",  
      method: "POST",
      data: userObject,
      headers: { "Content-Type": "application/json" },
      signal: cancel
        ? cancelApiObject[this.updateUser.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  deleteUser: async function (userObject: any, cancel = false) {
    const response = await api.request({
      url: "/user/delete",  
      method: "POST",
      data: userObject,
      signal: cancel
        ? cancelApiObject[this.deleteUser.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

const cancelApiObject = defineCancelApiObject(userApi);
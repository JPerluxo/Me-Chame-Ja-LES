import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const vehicleApi = {
  saveVehicle: async function (vehicleObject: any, cancel = false) {
    const response = await api.request({
      url: "/vehicle/save",
      method: "POST",
      data: vehicleObject,
      headers: { "Content-Type": "application/json" },
      signal: cancel
        ? cancelApiObject[this.saveVehicle.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  getVehicles: async function (cancel = false) {
    const response = await api.request({
      url: "/vehicle/getAll",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getVehicles.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  getVehicleById: async function (id: number, cancel = false) {
    const response = await api.request({
      url: `/vehicle/getById?id=${id}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getVehicleById.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  updateVehicle: async function (vehicleObject: any, cancel = false) {
    const response = await api.request({
      url: "/vehicle/update",
      method: "POST",
      data: vehicleObject,
      headers: { "Content-Type": "application/json" },
      signal: cancel
        ? cancelApiObject[this.updateVehicle.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  deleteVehicle: async function (vehicleObject: any, cancel = false) {
    const response = await api.request({
      url: "/vehicle/delete",
      method: "POST",
      data: vehicleObject,
      signal: cancel
        ? cancelApiObject[this.deleteVehicle.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

const cancelApiObject = defineCancelApiObject(vehicleApi);
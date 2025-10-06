import { api } from "./configs/axiosConfig";
import { defineCancelApiObject } from "./configs/axiosUtils";

export const deliveryApi = {
  saveDelivery: async function (deliveryObject: any, cancel = false) {
    const response = await api.request({
      url: "/delivery/save",
      method: "POST",
      data: deliveryObject,
      headers: { "Content-Type": "application/json" },
      signal: cancel
        ? cancelApiObject[this.saveDelivery.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  getDeliveries: async function (cancel = false) {
    const response = await api.request({
      url: "/delivery/getAll",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getDeliveries.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },

  updateDeliveryStatus: async function (entregaId: number, motoristaId: number, status: string, cancel = false) {
    const response = await api.request({
      url: "/delivery/update",
      method: "POST",
      data: { entregaId, motoristaId, status },
      headers: { "Content-Type": "application/json" },
      signal: cancel
        ? cancelApiObject[this.updateDeliveryStatus.name].handleRequestCancellation().signal
        : undefined,
    });
    return response.data;
  },
};

const cancelApiObject = defineCancelApiObject(deliveryApi);
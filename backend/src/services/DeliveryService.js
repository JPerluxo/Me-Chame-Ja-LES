const ValidateDeliveryStrategy = require('../strategies/Delivery/ValidateDeliveryStrategy');
const SaveDeliveryStrategy = require('../strategies/Delivery/SaveDeliveryStrategy');
const CheckDeliveryIfExistsStrategy = require('../strategies/Delivery/CheckDeliveryIfExistsStrategy');
const UpdateDeliveryStrategy = require('../strategies/Delivery/UpdateDeliveryStrategy');
const GetDeliveriesStrategy = require('../strategies/Delivery/GetDeliveriesStrategy');
const DeleteDeliveryStrategy = require('../strategies/Delivery/DeleteDeliveryStrategy');

class DeliveryService {
    static async saveDelivery(delivery) {
        try {
            await ValidateDeliveryStrategy.execute(delivery);
            return await SaveDeliveryStrategy.execute(delivery);
        } catch (error) {
            throw error;
        }
    }

    static async updateDelivery(delivery) {
        try {
            await CheckDeliveryIfExistsStrategy.execute({ id: delivery.id }, "mustExist");
            await ValidateDeliveryStrategy.execute(delivery);
            return await UpdateDeliveryStrategy.execute(delivery);
        } catch (error) {
            throw error;
        }
    }

    static async getDeliveryById(id) {
        try {
            await CheckDeliveryIfExistsStrategy.execute({ id: id }, "mustExist");
            return await GetDeliveriesStrategy.execute(id);
        } catch (error) {
            throw error;
        }
    }

    static async getAllDeliveries() {
        try {
            return await GetDeliveriesStrategy.execute();
        } catch (error) {
            throw error;
        }
    }

    static async deleteDelivery(delivery) {
        try {
            await CheckDeliveryIfExistsStrategy.execute({ id: delivery.id }, "mustExist");
            return await DeleteDeliveryStrategy.execute(delivery.id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryService;

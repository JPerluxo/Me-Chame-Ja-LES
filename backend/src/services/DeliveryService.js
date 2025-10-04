const ValidateDeliveryStrategy = require('../strategies/Delivery/ValidateDeliveryStrategy');
const SaveDeliveryStrategy = require('../strategies/Delivery/SaveDeliveryStrategy');

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
            
        } catch (error) {
            throw error;
        }
    }

    static async getDeliveryById(id) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async getAllDeliverys() {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async deleteDelivery(delivery) {
        try {
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryService;

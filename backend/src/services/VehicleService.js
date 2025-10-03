const ValidateVehicleStrategy = require('../strategies/Vehicle/ValidateVehicleStrategy');
const SaveVehicleStrategy = require('../strategies/Vehicle/SaveVehicleStrategy');

class VehicleService {
    static async saveVehicle(vehicle) {
        try {
            await ValidateVehicleStrategy.execute(vehicle);
            return await SaveVehicleStrategy.execute(vehicle);
        } catch (error) {
            throw error;
        }
    }

    static async updateVehicle(vehicle) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async getVehicleById(id) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async getAllVehicles() {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async deleteVehicle(vehicle) {
        try {
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VehicleService;

const VehicleDAO = require('../../daos/VehicleDAO');

class CheckVehicleIfExistsStrategy {
    static async execute(where, mode) {
        try {
            const vehicle = (await VehicleDAO.findOne(where))?.dataValues;

            if (mode === "mustExist" && !vehicle) {
                throw new Error("Veículo não encontrado.");
            }

            if (mode === "mustNotExist" && vehicle) {
                throw new Error("Já existe um veículo com os critérios especificados.");
            }

            return true;
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = CheckVehicleIfExistsStrategy;

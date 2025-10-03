const sequelize = require("../../config/dbConfig");
const VehicleDAO = require('../../daos/VehicleDAO');

class UpdateVehicleStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await VehicleDAO.update(data, transaction);

            await transaction.commit();
            return { status: 200, message: `Veículo ${data.licensePlate} alterado com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = UpdateVehicleStrategy;

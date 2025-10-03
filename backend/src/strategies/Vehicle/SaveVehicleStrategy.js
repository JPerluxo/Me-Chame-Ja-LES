const sequelize = require("../../config/dbConfig");
const VehicleDAO = require('../../daos/VehicleDAO');

class SaveVehicleStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await VehicleDAO.save(data, transaction);

            await transaction.commit();
            return { status: 200, message: 'Veículo salvo com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = SaveVehicleStrategy;

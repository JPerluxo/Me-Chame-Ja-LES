const sequelize = require("../../config/dbConfig");
const VehicleDAO = require('../../daos/VehicleDAO');

class GetVehiclesStrategy {
    static async execute(id = null) {
        const transaction = await sequelize.transaction();
        try {
            const data = id ? await VehicleDAO.findOne({ id: id }, transaction) : await VehicleDAO.findAll(transaction);

            await transaction.commit();
            return { status: 200, data };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetVehiclesStrategy;

const sequelize = require("../../config/dbConfig");
const VehicleDAO = require('../../daos/VehicleDAO');

class DeleteVehicleStrategy {
    static async execute(id) {
        const transaction = await sequelize.transaction();
        try {
            await VehicleDAO.delete(id, transaction);

            await transaction.commit();
            return { status: 200, message: `Veículo ${id} deletado com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = DeleteVehicleStrategy;

const sequelize = require("../../config/dbConfig");
const DeliveryDAO = require('../../daos/DeliveryDAO');

class DeleteDeliveryStrategy {
    static async execute(id) {
        const transaction = await sequelize.transaction();
        try {
            await DeliveryDAO.delete(id, transaction);

            await transaction.commit();
            return { status: 200, message: `Entrega ${id} deletada com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = DeleteDeliveryStrategy;

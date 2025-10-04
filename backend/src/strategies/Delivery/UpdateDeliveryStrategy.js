const sequelize = require("../../config/dbConfig");
const DeliveryDAO = require('../../daos/DeliveryDAO');

class UpdateDeliveryStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await DeliveryDAO.update(data, transaction);

            await transaction.commit();
            return { status: 200, message: `Entrega ${data.id} alterada com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = UpdateDeliveryStrategy;

const sequelize = require("../../config/dbConfig");
const DeliveryDAO = require('../../daos/DeliveryDAO');

class SaveDeliveryStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await DeliveryDAO.save(data, transaction);

            await transaction.commit();
            return { status: 200, message: 'Entrega salva com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = SaveDeliveryStrategy;

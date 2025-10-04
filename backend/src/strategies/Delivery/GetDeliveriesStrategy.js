const sequelize = require("../../config/dbConfig");
const DeliveryDAO = require('../../daos/DeliveryDAO');

class GetDeliveriesStrategy {
    static async execute(id = null) {
        const transaction = await sequelize.transaction();
        try {
            const data = id ? await DeliveryDAO.findOne({ id: id }, transaction) : await DeliveryDAO.findAll(transaction);

            await transaction.commit();
            return { status: 200, data };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetDeliveriesStrategy;

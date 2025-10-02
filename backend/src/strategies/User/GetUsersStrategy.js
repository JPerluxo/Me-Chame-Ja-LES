const sequelize = require("../../config/dbConfig");
const UserDAO = require('../../daos/UserDAO');

class GetUsersStrategy {
    static async execute(id = null) {
        const transaction = await sequelize.transaction();
        try {
            const data = id ? await UserDAO.findOne({ id: id }, transaction) : await UserDAO.findAll(transaction);

            await transaction.commit();
            return { status: 200, data };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = GetUsersStrategy;

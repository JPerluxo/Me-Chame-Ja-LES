const sequelize = require("../../config/dbConfig");
const UserDAO = require('../../daos/UserDAO');

class SaveUserStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await UserDAO.save(data, transaction);

            await transaction.commit();
            return { status: 200, message: 'Usuário salvo com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = SaveUserStrategy;

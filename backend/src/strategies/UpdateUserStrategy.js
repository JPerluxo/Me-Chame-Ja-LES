const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');

class UpdateUserStrategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            await UserDAO.update(data, transaction);

            await transaction.commit();
            return { status: 200, message: `Usuário ${data.name} alterado com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = UpdateUserStrategy;

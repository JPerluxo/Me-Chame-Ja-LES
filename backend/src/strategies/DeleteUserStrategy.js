const sequelize = require("../config/dbConfig");
const UserDAO = require('../daos/UserDAO');

class DeleteUserStrategy {
    static async execute(id) {
        const transaction = await sequelize.transaction();
        try {
            await UserDAO.delete(id, transaction);

            await transaction.commit();
            return { status: 200, message: `Usuário ${id} deletado com sucesso!` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = DeleteUserStrategy;

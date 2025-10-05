const sequelize = require("../../config/dbConfig");
const UserDAO = require('../../daos/UserDAO');

class AuthUserStrategy {
    static async execute(user) {
        const transaction = await sequelize.transaction();
        try {
            const data = await UserDAO.findOne({ email: user.email }, transaction);
            if (user.password !== data.password) {
                throw new Error('Senha incorreta.');
            }

            const formattedUser = {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                cellphone: data.cellphone,
                type: data.type,
                createdAt: data.createdAt,
            };

            await transaction.commit();
            return { success: true, message: 'Login realizado com sucesso!', user: formattedUser };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = AuthUserStrategy;

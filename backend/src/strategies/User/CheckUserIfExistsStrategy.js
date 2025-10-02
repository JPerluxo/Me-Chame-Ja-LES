const UserDAO = require('../../daos/UserDAO');

class CheckUserIfExistsStrategy {
    static async execute(where, mode) {
        try {
            const user = (await UserDAO.findOne(where))?.dataValues;

            if (mode === "mustExist" && !user) {
                throw new Error("Usuário não encontrado.");
            }

            if (mode === "mustNotExist" && user) {
                throw new Error("Já existe um usuário com os critérios especificados.");
            }

            return true;
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = CheckUserIfExistsStrategy;

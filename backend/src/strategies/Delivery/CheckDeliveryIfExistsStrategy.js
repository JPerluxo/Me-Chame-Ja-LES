const DeliveryDAO = require('../../daos/DeliveryDAO');

class CheckDeliveryIfExistsStrategy {
    static async execute(where, mode) {
        try {
            const delivery = (await DeliveryDAO.findOne(where));

            if (mode === "mustExist" && !delivery) {
                throw new Error("Entrega não encontrada.");
            }

            if (mode === "mustNotExist" && delivery) {
                throw new Error("Já existe uma entrega com os critérios especificados.");
            }

            return true;
        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = CheckDeliveryIfExistsStrategy;

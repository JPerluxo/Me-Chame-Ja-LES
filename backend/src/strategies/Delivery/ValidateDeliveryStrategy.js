const UserDAO = require('../../daos/UserDAO');
const VehicleDAO = require('../../daos/VehicleDAO');

class ValidateDeliveryStrategy {
    static async execute(data) {
        try {
            const missingFields = ['requesterId', 'status', 'type', 'originAddress', 'destinationAddress'].filter(field => !(field in data));

            if (missingFields.length > 0) {
                throw new Error(`Os seguintes campos estão faltando: ${missingFields.join(', ')}.`);
            }

            if ([data.requesterId, data.status, data.type, data.originAddress, data.destinationAddress].some(v => v === undefined || v === null || v === '')) {
                throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
            }

            const requester = await UserDAO.findOne({ id: Number(data.requesterId) });
            if (!requester || requester.type !== 'solicitante') {
                throw new Error('O campo "Solicitante" deve conter o ID de um usuário válido do tipo "solicitante".');
            }

            if (data.driverId !== undefined && data.driverId !== null && data.driverId !== '') {
                const driver = await UserDAO.findOne({ id: Number(data.driverId) });

                if (!driver || driver.type !== 'motorista') {
                    throw new Error('O campo "Motorista" deve conter o ID de um usuário válido do tipo "motorista".');
                }
            }

            if (data.vehicleId !== undefined && data.vehicleId !== null && data.vehicleId !== '') {
                const vehicleId = Number(data.vehicleId);
                if (isNaN(vehicleId) || !Number.isInteger(vehicleId) || !(await VehicleDAO.findOne({ id: vehicleId }))) {
                    throw new Error('O campo "Veículo" deve conter um ID válido.');
                }
            }

            if (typeof data.status !== 'string' || !["pendente", "aceita", "em_andamento", "concluida", "cancelada"].includes(data.status)) {
                throw new Error('O campo "Status" deve conter um valor válido.');
            }

            if (typeof data.type !== 'string' || !["material_construcao", "animal", "outros"].includes(data.type)) {
                throw new Error('O campo "Tipo" deve conter um valor válido.');
            }

            if (data.description && typeof data.description !== 'string') {
                throw new Error('O campo "Descrição" deve conter uma string.');
            }

            if (typeof data.originAddress !== 'string' || typeof data.destinationAddress !== 'string') {
                throw new Error('Os campos "Endereço de origem" e "Endereço de destino" devem conter strings válidas.');
            }

            if (data.scheduledTime && isNaN(Date.parse(data.scheduledTime))) {
                throw new Error('O campo "Horário agendado" deve conter uma data válida.');
            }

            if (data.completedTime && isNaN(Date.parse(data.completedTime))) {
                throw new Error('O campo "Horário concluído" deve conter uma data válida.');
            }

            if (data.value !== undefined && data.value !== null && data.value !== '') {
                const value = Number(data.value);
                if (isNaN(value) || value < 0) {
                    throw new Error('O campo "Valor" deve conter um número positivo.');
                }
            }

            if (!Array.isArray(data.items) || data.items.length === 0) {
                throw new Error('O campo "Itens" deve conter uma lista com pelo menos um item.');
            }

            data.items.forEach((item, index) => {
                if (typeof item.name !== 'string' || item.name.trim() === '') {
                    throw new Error(`O item ${index + 1} deve ter um nome válido.`);
                }

                if (item.quantity !== undefined) {
                    const quantity = Number(item.quantity);
                    if (isNaN(quantity) || quantity <= 0) {
                        throw new Error(`O item ${index + 1} deve ter uma quantidade válida.`);
                    }
                }

                if (item.weight !== undefined) {
                    const weight = Number(item.weight);
                    if (isNaN(weight) || weight <= 0) {
                        throw new Error(`O item ${index + 1} deve ter um peso válido.`);
                    }
                }

                if (item.remarks && typeof item.remarks !== 'string') {
                    throw new Error(`O campo 'Observações' do item ${index + 1} deve ser uma string.`);
                }
            });

        } catch (error) {
            throw error.message;
        }
    }
}

module.exports = ValidateDeliveryStrategy;

const Vehicle = require('../models/vehicle');

class VehicleDAO {
    static async save(data, transaction = null) {
        try {
            return await Vehicle.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await Vehicle.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, transaction = null) {
        try {
            return await Vehicle.destroy({
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async findOne(where, transaction = null) {
        try {
            return await Vehicle.findOne({
                where: where,
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async findAll(transaction = null) {
        try {
            return await Vehicle.findAll({ transaction });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VehicleDAO;

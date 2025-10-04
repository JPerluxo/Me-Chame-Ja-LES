const Delivery = require("../models/delivery");
const DeliveryItem = require("../models/deliveryItem");

class DeliveryDAO {
    static async save(data, transaction = null) {
        try {
            const { items, ...deliveryFields } = data;
            const delivery = await Delivery.create(deliveryFields, { transaction });
            await Promise.all(items.map(item =>
                DeliveryItem.create({ ...item, deliveryId: delivery.id }, { transaction })
            ));
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, items, ...deliveryFieldsToUpdate } = data;
            await Delivery.update(deliveryFieldsToUpdate, {
                where: { id: id },
                transaction
            });
            await DeliveryItem.destroy({ where: { deliveryId: id }, transaction });
            await Promise.all(
                items.map(item =>
                    DeliveryItem.create({ ...item, deliveryId: id }, { transaction })
                )
            );
        } catch (error) {
            throw error;
        }
    }

    static async delete(id, transaction = null) {
        try {
            await DeliveryItem.destroy({
                where: { deliveryId: id },
                transaction
            });

            return await Delivery.destroy({
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async findOne(where, transaction = null) {
        try {
            return await Delivery.findOne({
                where: where,
                include: [{ model: DeliveryItem, as: "items" }],
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async findAll(transaction = null) {
        try {
            return await Delivery.findAll({
                include: [{ model: DeliveryItem, as: "items" }],
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryDAO;

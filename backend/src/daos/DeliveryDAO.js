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
            const delivery = await Delivery.findOne({
                where: where,
                transaction
            });
            if (!delivery) return null;
            const items = await DeliveryItem.findAll({
                where: { deliveryId: delivery.id },
                transaction
            });
            return { ...delivery.toJSON(), items };
        } catch (error) {
            throw error;
        }
    }

    static async findAll(transaction = null) {
        try {
            const deliveries = await Delivery.findAll({ transaction });
            return await Promise.all(deliveries.map(async delivery => {
                const items = await DeliveryItem.findAll({
                    where: { deliveryId: delivery.id },
                    transaction
                });
                return { ...delivery.toJSON(), items };
            })
        );
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DeliveryDAO;

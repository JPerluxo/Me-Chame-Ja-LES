const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const DeliveryItem = sequelize.define('itens_entrega', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "item_entrega_id"
    },

    deliveryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "entrega_id"
    },

    name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "nome_item"
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "quantidade"
    },

    weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "peso_kg"
    },

    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "observacoes"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = DeliveryItem;

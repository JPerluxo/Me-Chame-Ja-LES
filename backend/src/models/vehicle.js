const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Vehicle = sequelize.define('veiculos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "veiculo_id"
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usuario_id"
    },

    licensePlate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "placa"
    },

    manufacturer: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "marca"
    },

    model: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "modelo"
    },

    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "ano"
    },

    type: {
        type: DataTypes.ENUM("carro", "caminhao", "moto", "van", "outro"),
        allowNull: false,
        field: "tipo"
    },

    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "capacidade_kg"
    },

    transportsAnimals: {
        type: DataTypes.TINYINT,
        allowNull: true,
        field: "transporte_animais"
    },

    transportsMaterials: {
        type: DataTypes.TINYINT,
        allowNull: true,
        field: "transporte_material_construcao"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Vehicle;

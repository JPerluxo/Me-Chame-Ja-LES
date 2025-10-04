const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Delivery = sequelize.define('entregas', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "entrega_id"
    },

    requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "solicitante_id"
    },

    driverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "motorista_id"
    },

    vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "veiculo_id"
    },

    status: {
        type: DataTypes.ENUM("pendente", "aceita", "em_andamento", "concluida", "cancelada"),
        allowNull: false,
        field: "status"
    },

    type: {
        type: DataTypes.ENUM("material_construcao", "animal", "outros"),
        allowNull: false,
        field: "tipo"
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "descricao"
    },

    originAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "endereco_origem"
    },

    destinationAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "endereco_destino"
    },

    scheduledTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "horario_agendado"
    },

    completedTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "horario_concluido"
    },

    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: "valor"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Delivery;

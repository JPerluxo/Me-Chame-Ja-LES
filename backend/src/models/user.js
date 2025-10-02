const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "usuario_id"
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nome"
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "email"
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "senha"
    },

    cellphone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "telefone"
    },

    type: {
        type: DataTypes.ENUM("motorista", "solicitante"),
        allowNull: false,
        field: "tipo_usuario"
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "criado_em"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;

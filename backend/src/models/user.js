const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('users', {
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        field: "usr_cpf"
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "usr_nome"
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "usr_sobrenome"
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "usr_email"
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "usr_senha"
    },

    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "usr_data_nascimento"
    },

    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "usr_type"
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "usr_status"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;

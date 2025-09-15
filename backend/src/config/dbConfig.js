const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('me-chame-ja', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

module.exports = sequelize;
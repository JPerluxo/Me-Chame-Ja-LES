const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('me_chame_ja', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

module.exports = sequelize;
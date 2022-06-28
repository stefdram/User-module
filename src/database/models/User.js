const Sequelize = require('sequelize');
const sequelize = require('../../../loaders/sequelize');

const userTable = sequelize.define(
  'userTable',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { tableName: 'userTable' }
);

userTable.sync();

module.exports = userTable;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('usersDB', 'root', 'pass', {
  dialect: 'mysql',
});

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection made successfully');
  })
  .catch((err) => console.log(err, 'this has error'));

module.exports = userTable;

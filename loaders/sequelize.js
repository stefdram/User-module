const Sequelize = require('sequelize');

const sequelize = new Sequelize('usersDB', 'root', 'pass', {
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection made successfully');
  })
  .catch((err) => console.log(err, 'this has error'));

module.exports = sequelize;

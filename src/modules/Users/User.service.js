const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDAL = require('./User.DAL');

exports.createUserService = async (id, name, email, passBefore) => {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(passBefore, salt);
  await UserDAL.createUserTable(id, name, email, password);
  console.log(salt);
  console.log(password);
};

exports.passwordUpdate = async (newPassword, paramId) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  UserDAL.changePass(hashedPassword, paramId);
};

exports.loginUser = async (user) => {
  // jwt token provision
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, 'Random string', { expiresIn: '1d' });
  return token;
};

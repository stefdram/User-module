const bcrypt = require('bcrypt');
const passport = require('passport');
const UserService = require('./User.service');
const UserDAL = require('./User.DAL');
const userTable = require('../../database/models/User');
require('../../config/passport');

exports.getAll = async (req, res) => {
  const all = await UserDAL.findAll;
  return res.json(all);
};

exports.getById = async (req, res) => {
  const paramId = req.params.id;
  const user = await UserDAL.findUser(paramId);
  return res.json(user);
};

exports.createUser = async (req, res) => {
  // check whether the user id has been taken
  if ((await userTable.findOne({ where: { id: req.body.id } })) != null) {
    return res.send('User id has been taken');
  }
  const { id, name, email } = req.body;
  const passBefore = req.body.password;
  await UserService.createUserService(id, name, email, passBefore);
  return res.send('user created successfully');
};

exports.changePassword = async (req, res) => {
  // check whether the user id exists
  if ((await userTable.findOne({ where: { id: req.params.id } })) == null) {
    return res.send('User id does not exist');
  }
  const { newPassword } = req.body;
  const paramId = req.params.id;
  await UserService.passwordUpdate(newPassword, paramId);
  return res.send('Password changed');
};

exports.deleteUser = async (req, res) => {
  // check whether the user id exists
  if ((await userTable.findOne({ where: { id: req.params.id } })) == null) {
    return res.send('User id does not exist');
  }
  const paramId = req.params.id;
  UserDAL.delete(paramId);
  return res.send(`User ${paramId} deleted successfully`);
};

exports.login = async (req, res) => {
  const user = await userTable.findOne({ where: { id: req.params.id } });
  // No user found
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  // password incorrect
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.send('Not allowed! Incorrect password');
  }
  const token = await UserService.loginUser(user);
  return res.send(`Success! Bearer ${token}`);
};

(exports.getAuthenticatedUser = passport.authenticate('jwt', {
  session: false,
})),
  (req, res) => res.send('Success, authorized!!');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const userTable = require('/Users/stefandanielramli/Desktop/User-module project/User-module/src/database/models/User.js');
require('/Users/stefandanielramli/Desktop/User-module project/User-module/src/config/passport.js');

exports.getAll = async(req, res) => {
  const all = await userTable.findAll();
  res.json(all);
};

exports.getById = async(req, res) => {
    const user = await userTable.findAll({ where: { id: req.params.id } });
    res.json(user);
};

exports.createUser = async(req, res) => {
  const salt = await bcrypt.genSalt();
  //hash password using the salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const { id } = req.body;
  //check whether the user id has been taken
  if ((await userTable.findOne({ where: { id } })) != null) {
    return res.send('User id has been taken');
  }
  //user creation
  const { name } = req.body;
  const { email } = req.body;
  const password = hashedPassword;
  const saveUser = userTable.build({
    id,
    name,
    email,
    password,
  });
  await saveUser.save();
  console.log(salt);
  console.log(hashedPassword);
  res.send('user created successfully');
};

exports.changePassword = async(req, res) => {
  //check whether the user id exists
  if ((await userTable.findOne({ where: { id: req.params.id } })) == null) {
    return res.send('User id does not exist');
  }
  //password hashing and update
  const { newPassword } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  userTable.update(
    {
      password: hashedPassword,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.send('Password changed');
};

exports.deleteUser = (req, res) => {
    userTable.destroy({
        where: {
          id: req.params.id,
        },
    });
    res.send("User " + req.params.id + " deleted successfully");
};

exports.login = async(req, res) => {
  const user = await userTable.findOne({ where: { id: req.params.id } });
  // No user found
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  //password incorrect
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.send('Not allowed! Incorrect password');
  } 
  //jwt token provision
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, 'Random string', { expiresIn: '1d' });
  res.send(`Success! Bearer ${token}`);
}

exports.getAuthenticatedUser = passport.authenticate('jwt', { session: false }),
(req, res) => {
  return res.send("success! authorized");
};
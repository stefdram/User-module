const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const userTable = require('/Users/stefandanielramli/Desktop/User-module project/UserModule_using_sequelize/src/database/models/User.js');
require('/Users/stefandanielramli/Desktop/User-module project/UserModule_using_sequelize/src/config/passport.js');

router.use(passport.initialize());

router.get('/user', async (req, res) => {
  const all = await userTable.findAll();
  res.json(all);
});

router.get('/user/:id', async (req, res) => {
  const user = await userTable.findAll({ where: { id: req.params.id } });
  res.json(user);
});

router.post('/create', async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const { id } = req.body;
  if ((await userTable.findOne({ where: { id } })) != null) {
    return res.send('User id has been taken');
  }
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
});

router.put('/user/update/:id', (req, res) => {
  const { data } = req.body;
  userTable.update(
    {
      password: data,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.redirect('/');
  res.send('Password changed');
});

router.post('/login/:id', async (req, res) => {
  const user = await userTable.findOne({ where: { id: req.params.id } });
  // No user found
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res.send('Not allowed!');
  } else {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, 'Random string', { expiresIn: '1d' });
    res.send(`Success! Bearer ${token}`);
  }
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
    })
});

module.exports = router;

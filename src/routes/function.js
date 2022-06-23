const express = require('express');
const router = express.Router();

/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const userTable = require('/Users/stefandanielramli/Desktop/User-module project/User-module/src/database/models/User.js');
require('/Users/stefandanielramli/Desktop/User-module project/User-module/src/config/passport.js');*/
const User = require('/Users/stefandanielramli/Desktop/User-module project/User-module/src/modules/Users/User.controller.js');

//router.use(passport.initialize());

router.get('/user', User.getAll);
router.get('/user/:id', User.getById);
router.post('/create', User.createUser);
router.put('/user/update/:id', User.changePassword);
router.delete('/delete/:id', User.deleteUser);
router.post('/login/:id', User.login);
router.get('/protected', User.getAuthenticatedUser);

module.exports = router;

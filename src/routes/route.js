const express = require('express');
const router = express.Router();
const User = require('../modules/Users/User.controller');

router.get('/user', User.getAll);
router.get('/user/:id', User.getById);
router.post('/create', User.createUser);
router.put('/user/update/:id', User.changePassword);
router.delete('/delete/:id', User.deleteUser);
router.post('/login/:id', User.login);
router.get('/protected', User.getAuthenticatedUser);

module.exports = router;
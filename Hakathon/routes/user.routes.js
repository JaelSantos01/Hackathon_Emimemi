const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.post('/', userController.createUser);

router.post('/login', authController.login);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
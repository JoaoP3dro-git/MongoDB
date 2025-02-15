const express = require('express');
const AuthController = require('../controller/AuthController');
const router = express.Router();

router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .delete('/:id', AuthController.delete)

module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/registrar', userController.registrar);

module.exports = userRouter;
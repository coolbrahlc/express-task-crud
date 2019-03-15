const express = require('express');
const router = express.Router();
const controller = require('../userController');
const validationMiddleware = require('../utils/validationMiddleware');
const getUsersValidation = require('../utils/getUsersValidation');
const expressValidator = require('../utils/expressValidator');
const checkRules = require('../utils/postUserCheckParams');


router.get('/user',  controller.getAllUsers);
router.get('/user/:id', getUsersValidation, controller.getUser);
router.delete('/user/:id', getUsersValidation, controller.deleteUser);
router.put('/user/:id', checkRules.checkUpdateUsers, expressValidator, controller.updateUser);
router.post('/user', checkRules.checkUsers, expressValidator, controller.addUser);

module.exports.router = router;
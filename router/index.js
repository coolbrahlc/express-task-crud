const express = require('express');
const router = express.Router();

const controller = require('../userController');
const validationMiddleware = require('../utils/validationMiddleware');
const { check, validationResult } = require('express-validator/check');


router.get('/user',  controller.getAllUsers);



router.get('/user/:id',  controller.getUser);
router.post('/user',
    [
        check('email').isEmail(),
        check('age').isInt({min:10, max:100}),
        check('fullName').isLength({ min: 5 })
    ],
    controller.addUser);

router.delete('/user/:id',  controller.deleteUser);


module.exports.router = router;
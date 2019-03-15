const { check } = require('express-validator/check');

module.exports.checkUsers = [
    check('email').isEmail().withMessage("Email unvalid!"),
    check('age').isInt({min:10, max:100}).withMessage("Age must be between 18 and 100 years old"),
    check('fullName').isLength({ min: 5 }).withMessage("Atleast 5 characters"),
    check('isActive').optional().isBoolean(),
    check('password').optional().isLength({min:5, max:40})
];

module.exports.checkUpdateUsers = [
    check('email').optional().isEmail().withMessage("Email unvalid!"),
    check('age').optional().isInt({min:18, max:100}).withMessage("Age must be between 18 and 100 years old"),
    check('fullName').optional().isLength({ min: 5 }).withMessage("Atleast 5 characters"),
    check('isActive').optional().isBoolean(),
    check('password').optional().isLength({min:5, max:40})
];

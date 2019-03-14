const { check, validationResult } = require('express-validator/check');


// module.exports =  (req, res, next) => {
//     if (!req.body.fullName) {
//         next({code: 400, message: 'Invalid params'})
//     } else {
//         next();
//     }
//
// };

module.exports.validationMiddleware = (req, res, next) => {
    ([
        check('email').isEmail(),
        check('fullName').isLength({ min: 5 })
    ], (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.json("bAD RESPONCE");
        }
        next(req, res, next);
    });
}
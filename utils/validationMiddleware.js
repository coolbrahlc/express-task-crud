const { check, validationResult } = require('express-validator/check');


module.exports =  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next({code: 400, message: 'Invalid params'})
    } else {
        next();
    }

};


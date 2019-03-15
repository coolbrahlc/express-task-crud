const UserNotFoundError = require('../errors/userNotFoundError');

module.exports =  (req, res, next) => {
    if (req.params.id.length!==24) {
        throw new UserNotFoundError();
    } else {
        next();
    }
};
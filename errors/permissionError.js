const ApplicationError = require('./applicationError');

class PermissionError extends ApplicationError {
    constructor(message) {
        super(message || 'Access denied.', 404);
    }
}
module.exports = PermissionError;
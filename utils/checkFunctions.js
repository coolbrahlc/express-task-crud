const permissionError = require('../errors/permissionError');
const relations = require('../utils/relations');

module.exports.relationChecker = (req, res, next) => {
    let isSelf = false;
    if (req.headers.id === req.params.id) {
        isSelf = true;
    }
    let relation = relations[req.myRole][req.operationType];
    console.log(req.operationType, relation, req.myRole, '  its my ROLE');

    if (req.body.role) {
        req.role =req.body.role;
    }
    if (isSelf) {
        if (relation.indexOf('self') > -1) {
            next()
        } else {
            console.log('not in ARRAY');
            throw new permissionError;
        }
    } else {
        console.log('not selff');
        if (relation.indexOf(req.role) > -1) {
            next()
        } else {
            throw new permissionError;
        }
    }
};


module.exports.type = function (operationType) {
    return function (req, res, next) {
        req.operationType = operationType;
        next()
    }
};
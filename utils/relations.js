const permissionError = require('../errors/permissionError');


const roles = {
    admin: {
        cru: ['admin', 'moder', 'user', 'self'],
        d: ['admin', 'moder', 'user']
    },

    moder: {
        cru: ['moder', 'user', 'self'],
        d: ['self']
    },

    user: {
        cru: ['self'],
        d: ['self']
    }
};

module.exports = roles;



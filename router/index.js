const express = require('express');
const router = express.Router();
const controller = require('../userController');
const validationMiddleware = require('../utils/validationMiddleware');
const getUsersValidation = require('../utils/getUsersValidation');
const expressValidator = require('../utils/expressValidator');
const checkRules = require('../utils/postUserCheckParams');
const AccessControl = require('accesscontrol');
const Permission = require('../utils/PermissionCheck');
const relations = require('../utils/relations');
const permissionError = require('../errors/permissionError');

const PermissionChecker = require('../utils/checkFunctions');



router.get('/user', controller.getMyRole,
                        PermissionChecker.type('cru'),
                        controller.getAllUsers);


router.get('/user/:id', controller.getUserRoleById,
                        controller.getMyRole,
                        PermissionChecker.type('cru'),
                        PermissionChecker.relationChecker,
                        getUsersValidation,
                        controller.getUser);


router.delete('/user/:id',  controller.getMyRole,
                            PermissionChecker.type('d'),
                            getUsersValidation,
                            controller.deleteUser);


router.put('/user/:id', controller.getUserRoleById,
                        controller.getMyRole,
                        PermissionChecker.type('cru'),
                        PermissionChecker.relationChecker,
                        checkRules.checkUpdateUsers,
                        expressValidator,
                        controller.updateUser);


router.post('/user', controller.getMyRole,
                    PermissionChecker.type('cru'),
                    PermissionChecker.relationChecker,
                    checkRules.checkUsers,
                    expressValidator,
                    controller.addUser);


router.get('/roles_check',   controller.getMyRole, Permission.RoleCheck,);


module.exports.router = router;
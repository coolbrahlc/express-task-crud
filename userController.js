const {users} = require('./test');
const express = require('express');
const User = require('./models/user_model');
const { check, validationResult } = require('express-validator/check');

module.exports.getAllUsers = (req, res, next) => {
    // const queryObj = req.query;
    // console.log(queryObj);
    // res.json(users);
    console.log('asd123');

    User.find({})
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });

};


module.exports.getUser =  (req, res, next) => {
    //const id =  parseInt(req.params.id);
    //const user = users.find(u => u.id === id);
    // if(!user) {
    //     //res.send('User not found');
    //     next(new Error("USer not found in db"));
    // } else {
    //     res.json(user);
    //     }

    User.findById(req.params.id)
    .then(user => {
        if (!user) {
            throw new Error('User not found');
        }
        res.send(user);
    })
    .catch(err => {
        //console.log(err);
        next(err);
    });

};


module.exports.addUser = (req, res, next) => {
    // const getUSer = req.body;
    //
    // const oldUser = users.find( u => u.login === getUSer.login);
    // if (oldUser) {
    //     //res.send('USer already taken');
    //     //next(new Error("USer already taken'"));
    //     next({code:400, message:'USer already exists'});
    //     } else {users.push(getUSer);
    //             res.send('OK');
    //             }


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = new User(req.body);

    user.save()
        .then(savedUser => {
            res.send(savedUser);
        })
        .catch(err => {
            //console.log(err);
            next(err);
        })
};

module.exports.deleteUser = (req, res, next) => {

    User.deleteOne({_id: req.params.id})
        .then(deletedUSer => {
            res.send(deletedUSer);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};
const User = require('./models/user_model');
const UserNotFoundError = require('./errors/userNotFoundError');

const { AbilityBuilder } = require('@casl/ability');

const defineAbility = require('./utils/defineAbility');



// const ability_moder = AbilityBuilder.define((can, cannot) => {
//     can(['read','update'],'User');
// });

module.exports.getAllUsers = (req, res, next) => {
    User.find({}).accessibleBy(ability_moder)
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

module.exports.getUser =  (req, res, next) => {

    let ability = defineAbility(req);

    console.log(ability);
    User.findById(req.params.id).accessibleBy(ability)
        .then(user => {
        if (!user) {
            throw new UserNotFoundError();
        }
        res.send(user);
    })
    .catch(err => {
        next(err);
    });
};


module.exports.addUser = (req, res, next) => {

    let ability = defineAbility(req.headers.role);
    ability.throwUnlessCan('create', User);

    const user = new User(req.body);
    ability_moder.cannot('write', user);

    user.save()
        .then(savedUser => {
            res.send(savedUser);
        })
        .catch(err => {
            next(err);
        })
};

module.exports.deleteUser = (req, res, next) => {

    let ability_del = defineAbility(req);
    ability_del.throwUnlessCan('delete', User);


    console.log("deleted");

    User.deleteOne({_id: req.params.id})
        .then(deletedUSer => {
            if (deletedUSer.deletedCount===0){
                throw new UserNotFoundError();
            }
            res.send(deletedUSer);
        })
        .catch(err => {
            //console.log(err);
            next(err);
        });
};

module.exports.updateUser = (req, res, next) => {

    let ability = defineAbility(req);

    //ability.throwUnlessCan('update', User);
    console.log("asd1");
    const id = req.params.id;
    const body = req.body;
    //const test = {...body, ...{test: 1}};

    User.updateOne({_id: id}, {$set: body})
        .then(user => {
            ability.throwUnlessCan('delete', user);

            if (!user) {
                throw new UserNotFoundError();
            }
            res.send(user);
        })
        .catch(err=>{
            next(err);
        });
};
const User = require('./models/user_model');
const UserNotFoundError = require('./errors/userNotFoundError');


module.exports.getAllUsers = (req, res, next) => {

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

    User.findById(req.params.id)
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

    const user = new User(req.body);
    user.save()
        .then(savedUser => {
            res.send(savedUser);
        })
        .catch(err => {
            next(err);
        })
};

module.exports.deleteUser = (req, res, next) => {

    User.deleteOne({_id: req.params.id})
        .then(deletedUSer => {
            if (deletedUSer.deletedCount===0){
                next(new UserNotFoundError());
            }
            res.send(deletedUSer);
        })
        .catch(err => {
            //console.log(err);
            next(err);
        });
};

module.exports.updateUser = (req, res, next) => {

    console.log("asd1");
    const id = req.params.id;
    const body = req.body;
    //const test = {...body, ...{test: 1}};

    User.updateOne({_id: id}, {$set: body})
        .then(user => {

            if (!user) {
                throw new UserNotFoundError();
            }
            res.send(user);
        })
        .catch(err=>{
            next(err);
        });
};


module.exports.getUserRoleById =  (req, res, next) => {

    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                throw new UserNotFoundError();
            }
            req.role = user.role;
            next();
        })
        .catch(err => {
            next(err);
        });
};

module.exports.getMyRole = (req, res, next) => {

    User.findById(req.headers.id)
        .then(user => {
            if (!user) {
                throw new UserNotFoundError();
            }
            req.myRole = user.role;
            next();
        })
        .catch(err => {
            next(err);
        });
};
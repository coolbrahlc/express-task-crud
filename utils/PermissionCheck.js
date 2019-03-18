const permissionError = require('../errors/permissionError');
const relations = require('../utils/relations');

module.exports.createCheck= (req, res, next) => {


    if (req.myRole === "moder")  {
        if (req.body.role!== "admin") { //Модер может CREATE только Юзерам и Модерам
            next();
        } else {
            throw new permissionError;
        }
    } else if (req.myRole === "user") {
        throw new permissionError;
    }
    else next();
};

module.exports.updateCheck = (req, res, next) => {

    if (req.myRole === "user") {  //Юзер может UPDATE над собой.
        if (req.headers.id === req.params.id) {
            next();
        } else {
            throw new permissionError;
        }
    } else if (req.myRole  === "moder")  {

        if (req.role!== 2) { //Модер может UPDATE только Юзерам и Модерам
            next();
        } else {
            throw new permissionError;
        }
    } else next();
};

module.exports.deleteCheck = (req, res, next) => {

    if (req.myRole === "admin") {
        if (req.myRole === req.params.id) {
            throw new permissionError;
        } else {
            next();
        }
    } else if (req.myRole === "moder") {          //Модер может DELETE над собой.
        if (req.headers.id === req.params.id) {
            next();
        } else {
            throw new permissionError;
        }

    } else {                                        //Юзер может DELETE над собой.
        if (req.headers.id === req.params.id) {
            next();
        } else throw new permissionError;
    }

};


module.exports.getUserCheck = (req, res, next) => {

    console.log(req.myRole);

    if (req.myRole === "user") {            //Юзер может READ над собой.
        if (req.headers.id === req.params.id) {
            next();
        } else {
            throw new permissionError;
        }
    } else if (req.myRole === "moder")  {              //Модер может READ только Юзерам и Модерам
        if (req.role!== "admin") {
            next();
        } else {
            throw new permissionError;
        }
    } else next();
};

module.exports.RoleCheck = (req, res, next) => {

    if (req.myRole === "admin") {
        res.send('Роут доступный только админу');
    } throw new permissionError;
};




module.exports.relationChecker = (req, res, next) => {
    let isSelf = false;
    if (req.headers.id === req.params.id) {
        isSelf = true;
    }
    console.log(req.operationType);
    let relation = relations[req.myRole][req.operationType];
    //let relation = relations[req.myRole]['cru']; // !!!!!!
    console.log(relation);
    console.log(req.myRole + ' its my roleee');

    if (isSelf) {
        console.log('!!!is self');

        if (relation.indexOf('self') > -1) {
            next()
        } else {
            console.log('not in arrrr12');
            throw new permissionError;
        }
    } else {
        console.log('not self');

        if (relation.indexOf(req.role) > -1) {  // !!!!!!
            console.log(relation +' relation arrrr13');
            next()
        } else {
            throw new permissionError;
        }
    }
};

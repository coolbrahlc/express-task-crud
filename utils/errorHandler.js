
module.exports =  (err, req, res, next) => {

    // if (!err.code) {
    //     res.status(500).send(err.message)
    // } else {
    //     res.status(err.code).send(err.message);
    // }

    if (!err.code) {
        res.status(500).send(err)
    } else {
        res.status(500).json(err);
    }
    //console.log(err);
    //res.status(500).end();

};
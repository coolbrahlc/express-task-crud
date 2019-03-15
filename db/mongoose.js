const mongoose = require('mongoose');
require('../models/user_model');


mongoose.connect('mongodb://localhost/my_new_database',  { useNewUrlParser: true }, (err) =>{
    if (err) {
        process.exit(1);
    } else {
        console.log('DB connection succes');
    }
});

mongoose.set('debug', true);
module.exports = mongoose;
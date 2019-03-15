const { accessibleRecordsPlugin } = require('@casl/mongoose');
const mongoose = require('mongoose');

mongoose.plugin(accessibleRecordsPlugin);



const Schema = new mongoose.Schema({
   fullName: {
       type: String,
       required: true
   },
    email : {
       type: String,
        required: true,
        unique: true
    },
    age: {
       required: true,
        type: Number
    },

    isActive: {
       type: Boolean,
        required: true,
        default: true
    },

    password: {
       type: String,
        required: true,
        select: false
    },

    role: {
        type: Number,
        required: true,
        default: 0
    },
});
Schema.plugin(accessibleRecordsPlugin);


const User = mongoose.model('User', Schema);
module.exports = User;
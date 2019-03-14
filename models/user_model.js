const mongoose = require('mongoose');
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
    }
});


const User = mongoose.model('User', Schema);
module.exports = User;
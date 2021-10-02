const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    email : {
        type : String,
        required : [ true, 'Email is required' ],
        unique : true
    },
    img : {
        type : String,
        required : false
    },
    google : {
        type : Boolean,
        default : false
    }
});

module.exports = model('User',userSchema);
const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        require: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.passwordHash;
    }
})


const User = mongoose.model('User', userSchema);

module.exports = User;
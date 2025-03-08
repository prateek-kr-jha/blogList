const monggose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', () => {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.passwordHash;
    }
})


const User = moongoose.model('User', userSchema);

module.exports = User;
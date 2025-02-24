const mongoose = require('mongoose');
const config = require('../utils/config');

const mongoUrl = config.MONGODB_URI;
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


blogSchema.set("toJSON", {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    },
});

mongoose.connect(mongoUrl).then(result => {
    console.log('connected to MongoDB');
}).catch(err => {
    console.log('error connecting to MongoDB:', err.message);
})

module.exports = mongoose.model('Blog', blogSchema);;
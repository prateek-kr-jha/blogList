const mongoose = require('mongoose');
const config = require('../utils/config');
mongoose.set('strictQuery', false);

const mongoUrl = process.env.NODE_ENV === "test" ? config.TEST_MONGODB_URI : config.MONGODB_URI;
console.log(mongoUrl, process.env.NODE_ENV);
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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
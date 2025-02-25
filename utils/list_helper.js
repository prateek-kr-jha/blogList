const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, curr) => sum + curr.likes, 0);
}

const mostBlogs = (blogs) => {
    const result = _.maxBy(blogs, );
}

const favoriteBlog = (blogs) => {
    const result = _.maxBy(blogs, 'likes');
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
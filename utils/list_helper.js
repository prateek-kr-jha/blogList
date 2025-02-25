const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, curr) => sum + curr.likes, 0);
}

const mostBlogs = (blogs) => {
    
}

module.exports = {
    dummy,
    totalLikes
}
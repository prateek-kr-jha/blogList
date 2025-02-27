const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, curr) => sum + curr.likes, 0);
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) {
        return {}
    }
    const result = _.groupBy(blogs, 'author');
    const result2 = _.mapValues(result, (a) => a.length);
    const maxRepeated = _.maxBy(Object.keys(result2), (o) => result2[o]);

    return {
        author: maxRepeated,
        blogs: result2[maxRepeated]
    }

}

const favoriteBlog = (blogs) => {
    const result = _.maxBy(blogs, 'likes');
    return result;
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) {
        return {};
    }

    const result = _.groupBy(blogs, 'author');
    const result2 = _.mapValues(result, (a) => a.reduce((sum, curr) => sum + curr.likes, 0));
    console.log(result2);
    const maxLikes = _.maxBy(Object.keys(result2), (o) => result2[o]);
    console.log(maxLikes);

    return {
        author: maxLikes,
        likes: result2[maxLikes]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs, 
    mostLikes
}

// const listWithMultipleBlog =  [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: "5a422b3a1b54a676234d17f9",
//       title: "Canonical string reduction",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//       likes: 12,
//       __v: 0
//     },
//     {
//       _id: "5a422b891b54a676234d17fa",
//       title: "First class tests",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: "5a422ba71b54a676234d17fb",
//       title: "TDD harms architecture",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//       likes: 0,
//       __v: 0
//     },
//     {
//       _id: "5a422bc61b54a676234d17fc",
//       title: "Type wars",
//       author: "Robert C. Martin",
//       url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//       likes: 2,
//       __v: 0
//     }  
//   ]

// console.log(mostLikes(listWithMultipleBlog));

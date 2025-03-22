const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./blog_helper');
const Blogs = require('../model/blog');
const listHelper = require('../utils/list_helper');
const Users = require('../model/user');
const bcrypt = require('bcrypt');

const createUser = async () => {
    const saltRounds = 10;
    const password = "tringsThe";
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log(passwordHash, "----------")
    const newUser = new Users({
        "username": "trir",
        "name": "trng oet",
        passwordHash
    })

    const returnedUser = await newUser.save();
}

beforeEach(async () => {
    console.log('in before each');
    await Blogs.deleteMany({});
    console.log('cleared');
    const blogObjects = helper.initialBlogs.map(blog => new Blogs(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
    //user creation
    await Users.deleteMany({});
    await createUser()

})

const api = supertest(app);





// test('dummy returns one', () => {
//     const blogs = [];
//     const result = listHelper.dummy(blogs);
//     assert.strictEqual(result, 1);
// })

describe('total likes', () => {
    // test('when list has only one blog, equals the likes of that', () => {

    //     const result = listHelper.totalLikes(listWithOneBlog);
    //     assert.strictEqual(result, 5);
    // })

    test('when list has multiple blogs, sum equals to sum of all likes', async () => {
        const blogs = await api.get('/api/blogs');
        const result = listHelper.totalLikes(blogs.body);
        assert.strictEqual(result, 36);
    })

    // const emptyList = [];
    // test('when list is empty, total likes is 0',() => {
    //     const result = listHelper.totalLikes(emptyList);
    //     assert.strictEqual(result, 0);
    // })
})

// describe('most blogs', () => {

//     // test('when list has only one blog, equals to that blog', () => {
//     //     const result = listHelper.mostBlogs(listWithOneBlog);
//     //     assert.deepStrictEqual(result, {
//     //         author: 'Edsger W. Dijkstra',
//     //         blogs: 1
//     //     });
//     // })


//     test('when list has multiple blog', () => {
//         const result = listHelper.mostBlogs(listWithMultipleBlog);
//         assert.deepStrictEqual(result, {
//             author: "Robert C. Martin",
//             blogs: 3
//         });
//     })

// })

// describe('highest likes', () => {
//     test('when list has only one blog, equals the likes of that', () => {
//         const result = listHelper.favoriteBlog(listWithOneBlog);
//         assert.deepStrictEqual(result, listWithOneBlog[0]);
//     })

//     test('when list has multiple blogs, sum eqauls to sum of all likes', () => {
//         const result = listHelper.favoriteBlog(listWithMultipleBlog);
//         assert.deepStrictEqual(result, {
//             _id: "5a422b3a1b54a676234d17f9",
//             title: "Canonical string reduction",
//             author: "Edsger W. Dijkstra",
//             url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//             likes: 12,
//             __v: 0
//           });
//     })

//     // const emptyList = [];
//     // test('when list is empty, total likes is 0',() => {
//     //     const result = listHelper.favoriteBlog(emptyList);
//     //     assert.strictEqual(result, 0);
//     // })
// })

// describe('most likes', () => {
//     test('when list has only one blog, equals to that blog', () => {
//         const result = listHelper.mostLikes(listWithOneBlog);
//         assert.deepStrictEqual(result,{
//             author: "Edsger W. Dijkstra",
//             likes: 5
//         })
//     })

//     test('when list has  multiple blog', () => {
//         const result = listHelper.mostLikes(listWithMultipleBlog);
//         assert.deepStrictEqual(result,{
//             author: "Edsger W. Dijkstra",
//             likes: 17
//         })
//     })
// })

describe('unique idetifier is id', () => {
    test('check for presence of id', async() => {
        const blogs = await api.get('/api/blogs');
        const id_absent = blogs.body.every(blog => blog.id);
        assert(id_absent)
    })
})

describe('adding a new blog', () => {
    test('a valid blog is added', async () => {
        const loginDetails = {
            username: "trir",
            password: "tringsThe"
        };
        const loginResponse = await api.post('/api/login').send(loginDetails);
        const userJwt = loginResponse.body.token;
        const newBlog = {
            "title": "rajesh3",
            "author": "arjesh3",
            "url": "khanna 3",
            "likes": 3
        }

        const token = "Bearer " + userJwt

        await api.post('/api/blogs')
        .send(newBlog)
        .set({ Authorization : token})
        .expect(201)
        .expect('Content-Type', /application\/json/);  

        const blogs = await helper.blogsInDb();
        console.log(blogs, "--------------------")
        assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
    })

    test('default likes is 0', async () => {
        const newBlog = {
            "title": "Test4",
            "author": "Test4",
            "url": "Test4"
        }

        const response = await api.post('/api/blogs').send(newBlog).expect(201);
        assert.strictEqual(response.body.likes, 0);
    })

    test('missing url and/or title', async () => {
        const newBlog = {
            "title": "",
            "author": "Test3",
            "url": ""
        }

        const response = await api.post('/api/blogs').send(newBlog).expect(400);
    })
})

describe('delete blog using id', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];
    test('delete a blog', async () => {
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
        const checkForBlog = await api.get(`/api/blogs/${blogToDelete.id}`).expect(404);
        const blogsAfterDelete = await helper.blogsInDb();
        assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length - 1);
    })
})


describe('update likes using id', async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdateBlog = blogs[1];

    test('update likes', async() => {
        const updatedBlog = {
            likes: 10
        }

        const response = await api.put(`/api/blogs/${blogToUpdateBlog.id}`).send(updatedBlog).expect(200);
        assert.strictEqual(response.body.likes, 10);
    })
})



after(async () => {
    await mongoose.connection.close();
})
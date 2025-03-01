const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./blog_helper');
const Blogs = require('../model/blog');
const listHelper = require('../utils/list_helper');

beforeEach(async () => {
    await Blogs.deleteMany({});
    console.log('cleared');
    const blogObjects = helper.initialBlogs.map(blog => new Blogs(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
})

const api = supertest(app);


describe('checks if the db is getting filled on its own', () => {
    test('blogs are returned as json', async () => {
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    })

    test('blogs are filled', async () => {
       const result = await api.get('/api/blogs');
        // console.log(result.body);
       assert.strictEqual(result.body.length, helper.initialBlogs.length);
    })
})

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

describe('most blogs', () => {

    test('when list has only one blog, equals to that blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        });
    })


    test('when list has multiple blog', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlog);
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        });
    })

})

describe('highest likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        assert.deepStrictEqual(result, listWithOneBlog[0]);
    })

    test('when list has multiple blogs, sum eqauls to sum of all likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlog);
        assert.deepStrictEqual(result, {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          });
    })

    // const emptyList = [];
    // test('when list is empty, total likes is 0',() => {
    //     const result = listHelper.favoriteBlog(emptyList);
    //     assert.strictEqual(result, 0);
    // })
})

describe('most likes', () => {
    test('when list has only one blog, equals to that blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog);
        assert.deepStrictEqual(result,{
            author: "Edsger W. Dijkstra",
            likes: 5
        })
    })

    test('when list has  multiple blog', () => {
        const result = listHelper.mostLikes(listWithMultipleBlog);
        assert.deepStrictEqual(result,{
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})

describe('test unique idetifier is id', () => {
    test()
})

after(async () => {
    await mongoose.connection.close();
})
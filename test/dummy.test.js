const { test, describe } = require('node:test');
const assert = require('assert');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    })

    const listWithMultipleBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 13,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 2,
            __v: 0
          }
    ]

    test('when list has multiple blogs, sum eqauls to sum of all likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlog);
        assert.strictEqual(result, 20);
    })

    const emptyList = [];
    test('when list is empty, total likes is 0',() => {
        const result = listHelper.totalLikes(emptyList);
        assert.strictEqual(result, 0);
    })
})

describe('most blogs', () => {
    
})
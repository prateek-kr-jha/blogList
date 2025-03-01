const blogRouter = require('express').Router();
const Blog = require('../model/blog');


blogRouter.get('/', async (request, response, next) => {
  const blog = await Blog.find({});
  return response.json(blog);;
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  const returnedBlog = await blog.save();
  return response.status(201).json(returnedBlog);
})


module.exports = blogRouter;
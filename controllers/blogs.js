const blogRouter = require('express').Router();
const Blog = require('../model/blog');
const blog_helper = require('../test/blog_helper');


blogRouter.get('/', async (request, response, next) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1});
  return response.json(blog);;
})

blogRouter.post('/', async (request, response, next) => {
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({error: 'title or url missing'}).end();
  }
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: request.body.user_id ? request.body.user_id : 0
  }
  const blog = new Blog(newBlog);

  const returnedBlog = await blog.save();
  return response.status(201).json(returnedBlog);
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
})

blogRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.find({id});

  const updatedBlog = {
    ...blog,
    ...req.body
  }

  const returnedBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {new: true});
  res.json(returnedBlog);
})


module.exports = blogRouter;
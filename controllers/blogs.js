const blogRouter = require('express').Router();
const Blog = require('../model/blog');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('./../utils/config');

// const getTokenFrom = request => {
//   const authorization = request.get('authorization');
//   if(authorization && authorization.startsWith('Bearer ')) {
//       return authorization.replace('Bearer ', '');
//   }

//   return null;
// }


blogRouter.get('/', async (request, response, next) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1});
  return response.json(blog);;
})

blogRouter.post('/', async (request, response, next) => {
  try {
    if(!request.body.title || !request.body.url || !request.user) {
      return response.status(400).json({error: 'title or url missing'}).end();
    }
    const user = request.user;
    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes ? request.body.likes : 0,
      user: user._id
    }
  
    if(!user) {
      return resp.status(401).json({ error: 'no such user' });
    }
    const blog = new Blog(newBlog);
  
    const returnedBlog = await blog.save();
    user.blogs = user.blogs.concat(returnedBlog.id);
    await user.save();
    return response.status(201).json(returnedBlog);
  } catch(e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user;
    
    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.params.id, 
      user: user._id
    });

    if(!deletedBlog) {
      return res.status(401).json({ error: 'unauthorized User' });

    }

    res.status(204).end();
  } catch(e) {
    next(e)
  }
})

blogRouter.put('/:id', async (req, res) => {
  const user = req.user;
  // console.log('user', user);
  const id = req.params.id;
  const blog = await Blog.findById(id);

  
  console.log('re', req.body)
  const found = user.likedBlogs.find(blogId => {
    return blogId.toString() === id
  });

  // console.log(found, "----------------------------------------");
  const updatedBlog = {
    ...req.body
  }

  console.log(updatedBlog, "----------------------------------------");

  const returnedBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {new: true});

  if(!found) {
    user.likedBlogs = user.likedBlogs.concat(returnedBlog.id);
    await user.save();
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { likedBlogs: id }
    });

  }
  return res.json(returnedBlog);


  // console.log(req.body, id, "----------------------------------------", req.user);

  // const updatedBlog = {
  //   ...blog,
  //   ...req.body
  // }

})


module.exports = blogRouter;
const express = require('express');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);



module.exports = app;
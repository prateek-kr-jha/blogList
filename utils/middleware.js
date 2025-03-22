const config = require('./config')
const User = require('./../model/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if(authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
  
    return null;
}

const getUserFromToken = async (token) => {
    const decodeToken = jwt.verify(token, config.SECRET);
  
    if(!decodeToken.id) {
      return res.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodeToken.id);
    if(user) {
        return user;
    }
    return null;
}


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if(error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          error: 'token expired'
        })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

const tokenExtractor = (req, res, next) => {
    console.log(req, "----------------------")
    req.token = getTokenFrom(req);
    next();
}

const userExtractor = async (req, res, next) => {
    try {
        req.user = await getUserFromToken(req.token);
        next()
    } catch(e) {
        next(e)
    }
}
module.exports = {
    errorHandler,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}
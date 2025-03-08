const bcrypt = require('bcrypt');
const User = require('../model/user');
const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({});

    return res.json(users);
})

userRouter.post('/', async (req, res) => {
    const body = req.body;

    if(!body.username || !body.password) {
        return res.status(400).json({error: 'username or password missing'});
    }
    if(body.password.length < 3) {
        return res.status(400).json({error: 'password length must be at least 3'});
    }

    const newUser = new User({
        ...body
    })

    const returnedUser = await newUser.save();

    res.status(201).json(returnedUser);

})
const bcrypt = require('bcrypt');
const User = require('../model/user');
const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({});

    return res.json(users);
})

userRouter.post('/', async (req, res) => {
    const {username, password, name } = req.body;

    if(!username || !password) {
        return res.status(400).json({error: 'username or password missing'});
    }
    if(password.length < 3) {
        return res.status(400).json({error: 'password length must be at least 3'});
    }

    const user = await User.find({ username });

    if(user) {
        return res.status(409).json({ error: 'username already taken'})
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const newUser = new User({
        username,
        name,
        password
    })

    const returnedUser = await newUser.save();

    res.status(201).json(returnedUser);

})

module.exports = userRouter;
const bcrypt = require('bcrypt');
const User = require('../model/user');
const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    // await User.deleteMany();

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
    console.log(user, "-----------------")
    if(user && user.length > 0) {
        return res.status(409).json({ error: 'username already taken'})
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        name,
        hashedPassword
    })

    const returnedUser = await newUser.save();

    res.status(201).json(returnedUser);

})

module.exports = userRouter;
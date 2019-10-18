const router = require('express').Router();
const User = require('./models');
const jwt = require('jsonwebtoken');
const restricted = require('../utils').getUserId;

//
//Get Users
router.get('/users', restricted, async (req, res, next) => {
    let { userId } = req.headers;
    console.log('userId from the headers AFTER rescricted: ', userId);
    try {
        let users = await User.getUsers(userId);
        res.status(200).json({ users });
    } catch (e) {
        next({
            code: 500,
            message: 'Server error. Gremlins attacked. Try again',
        });
    }
});

//
//Create New User
router.post('/register', registerValid, async (req, res, next) => {
    let user = req.body;

    try {
        let [newUserId] = await User.register(user);
        console.log(newUser);
        let token = jwt.sign({ userId: newUserId }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (e) {
        next({
            code: 500,
            message: 'Server error. The fire nation attacked. Try again',
        });
    }
});

//
//Login
router.post('/login', async (req, res, next) => {
    let user = req.body;
    console.log(user);
    try {
        let userId = await User.login(user);
        console.log(userId);
        if (!userId) {
            throw new Error();
        }
        let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (e) {
        next({
            code: 409,
            message: 'Login / Password is incorrect',
        });
    }
});

//
//Middleware
function registerValid(req, res, next) {
    let user = req.body;

    if (!user || !user.username || !user.password || !user.department) {
        next({
            code: 409,
            message: 'Missing parameters. You done messed up',
        });
    }

    if (user.password.length < 8) {
        next({
            code: 409,
            message: 'Password not long enough. Thats what she said',
        });
    }

    next();
}

module.exports = router;

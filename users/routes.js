const router = require('express').Router();
const User = require('./models');
const jwt = require('jsonwebtoken');

//
//Get Users
router.get('/users', async (req, res, next) => {
    try {
        let users = await User.getUsers();
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
        let newUser = await User.register(user);
        let token = jwt.sign(user, process.env.JWT_SECRET, {
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

    try {
        let login = await User.login(user);
        if (!login) {
            throw new Error();
        }
        let token = jwt.sign(user, process.env.JWT_SECRET, {
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

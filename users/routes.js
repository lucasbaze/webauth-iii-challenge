const router = require('express').Router();
const User = require('./models');

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
        res.status(200).json({ newUser });
    } catch (e) {
        next({
            code: 500,
            message: 'Server error. The fire nation attacked. Try again',
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

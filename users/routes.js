const router = require('express').Router();
const User = require('./models');

//
//Get Users
router.get('/users', async (req, res) => {
    let users = await User.getUsers();
    res.status(200).json({ users });
});

module.exports = router;

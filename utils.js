const jwt = require('jsonwebtoken');

function getUserId(req, res, next) {
    const Authorization = req.headers.authorization;
    console.log('line 5: ', Authorization);

    if (Authorization) {
        try {
            console.log('Got the Authorization Header');
            const token = Authorization.replace('Bearer ', '');
            console.log(token);
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Verified User: ', userId);
            req.headers.userId = userId;
            next();
        } catch (e) {
            next({
                code: 500,
                message: 'Auth token expired',
            });
        }
    } else {
        next({
            code: 401,
            message: 'Not Authorized',
        });
    }
}

module.exports.getUserId = getUserId;

const express = require('express');

//
//Middleware Imports
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
// const sessions = require('express-session');

//
//Route Middleware
const userRoutes = require('./users/routes');

//
//Config
// const sessionConfig = {
//     name: 'session',
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24,
//     },
//     resave: false,
//     saveUninitialized: false,
// };

//
//Initialize Server
const server = express();

//Initialize Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('tiny'));
// server.use(sessions(sessionConfig));

//
//Dummy Route
server.get('/', (req, res) => {
    res.send('Server is listening. Server is watching.');
});

//
//Use Routes
server.use('/api', userRoutes);

//
//Error Handler
server.use((err, req, res, next) => {
    let { code, message } = err;
    res.status(code).json({ message });
});

//
//Listen
const PORT = process.env.PORT;
server.listen(PORT, () =>
    console.log(`Server is always listening... on ${PORT}`)
);

const express = require('express');

//
//Middleware Imports
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//
//Initialize Server
const server = express();

//Initialize Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('tiny'));

//
//Dummy Route
server.get('/', (req, res) => {
    res.send('Server is listening. Server is watching.');
});

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

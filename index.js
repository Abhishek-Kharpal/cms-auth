const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const registerRoute = require('./src/routes/register');
const loginRoute = require('./src/routes/login');
const verifyToken = require('./src/routes/verifyToken');
const { redisClient } = require('./src/utils/redisUtil');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', verifyToken);

redisClient.connect();

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
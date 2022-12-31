require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Redis = require("ioredis");
const app = express();
const { logger } = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');

const y00tsRouter = require('./routes/y00ts.routes');

const y00tsCron = require('./crons/y00ts');

const redis = new Redis();


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(logger);

app.use(y00tsRouter);

y00tsCron(redis)

const PORT = process.env.PORT || 5001;

app.cache = redis;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

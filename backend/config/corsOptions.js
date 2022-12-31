const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (true || allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            console.log("CORS error: " + origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
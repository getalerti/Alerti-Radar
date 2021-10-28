const { createLogger, transports } = require('winston');

const logger = createLogger({
    level: "debug",
    transports: [
        new transports.File({ filename: "./logs/app.log" }),
        new transports.Console()
    ]
});
module.exports = logger;
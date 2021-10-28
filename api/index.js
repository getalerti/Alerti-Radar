const express           = require('express')
const bodyParser        = require('body-parser')
require('dotenv').config();
const cors              = require('cors')
var cron                = require('node-cron');
const router            = require('./routes');
const { generateFeeds } = require("./jobs/Feeds")
require('./helpers/db');
const logger            = require('./helpers/logger');
const app               = express()
const port = process.env.PORT || 3000
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))


app.use('/', router);

cron.schedule('0 0 0 * * *', async () => {
    // generate feeds cach for every user
    console.log("generate feeds...");
    await generateFeeds();
    console.log("generate feeds completed...");

})

app.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`);
})

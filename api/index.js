const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan')
var cron = require('node-cron');
const fs = require('fs')
const path = require('path')
const router = require('./routes');
const { generateFeeds } = require("./jobs/Feeds")
require('./config/db');
const app = express()
const port = process.env.PORT || 3000
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

// Logging
const logStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })
app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join(' ')
    })
)

app.use('/', router);

cron.schedule('0 0 0 * * *', async () => {
    // generate feeds cach for every user
    console.log("generate feeds...");
    await generateFeeds();
    console.log("generate feeds completed...");

})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

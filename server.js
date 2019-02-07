const express = require('express')
const app = express()
const PORT = 9000
const netflixRouter = require('./models/router.js')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', netflixRouter)


app.listen(PORT, ()=> {
	console.log('Listening at port: ' + PORT)
})

















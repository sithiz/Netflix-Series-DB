const express = require('express')
const app = express()
const PORT = 9000
const netflixRouter = require('./models/router.js')
const bodyParser= require('body-parser')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', netflixRouter)


app.listen(PORT, ()=> {
	console.log('Listening at port: ' + PORT)
})

















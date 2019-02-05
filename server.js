const express = require('express')
const app = express()
const PORT = 9000
const netflixRouter = require('./models/router.js')
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/netflix', netflixRouter)



app.listen(PORT, ()=> {
	console.log('Listening at port: ' + PORT)
})

















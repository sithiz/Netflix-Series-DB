
/*****************************************************************
*****************THE IMPORTED MODULES ***************************/
		const express = require('express')        
		const app = express()					  
		const PORT = 9000						
		const netflixRouter = require('./models/router.js')
		const bodyParser= require('body-parser') 
		const morgan = require('morgan')	
		const fs = require('fs')				
		const path = require('path')			
/*****************************************************************
*****************************************************************/

		/*********** LOGGER SET UP ************/
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))
/********************************************************
****************** BODY PARSER SETUP ********************
********************************************************/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//body parser adds a body to request object 

	/***************** ROUTER ************************/
			app.use('/', netflixRouter)


/*****************************************************/
/******************	LISTENING PORT 	 *****************/	
		
		app.listen(PORT, ()=> {
			console.log('Listening at port: ' + PORT)
		})

















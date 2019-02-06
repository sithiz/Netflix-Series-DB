const express = require('express')
const router = express.Router()
const { Client } = require('pg')


const connectionString = 'postgresql://sithis@localhost:5432/netflix_series'
const client = new Client({
    connectionString: connectionString,
})
client.connect()

//ALL SHOW AND INFORMTION
router.get('/Shows', (request, response) => {
    client.query('SELECT show_title,series_length,bio FROM shows', (error, result) => {
        response.send(result.rows)
    })
})
router.get('/Shows/:id', (request, response) => {
    let id = request.params.id
    client.query('SELECT show_title,series_length,bio FROM shows', (error, result) => {
        response.send(result.rows[id])
    })
})
//ALL ACTORS 
router.get('/Actors', (request, response) => {
    client.query('SELECT actor_name FROM actors', (error, results) => {
        response.send(results.rows)
    })
})

router.get('/Actors/:id', (request, response) => {
    let id = request.params.id
    client.query('SELECT actor_name FROM actors', (error, results) => {
        response.send(results.rows[id])
    })
})
router.get('/All', (request, response) => {
    client.query('SELECT * FROM shows_actors', (error, results) => {
        response.send(results.rows)
    })
})

router.post('/NewSeries', (request, response) => {
    let id = (request.body['ID'] * Math.random()) * 10000003
    let show_title = request.body['show_title']
    let series_length = request.body['series_length']
    let bio = request.body['bio']
    client.query(`INSERT INTO shows VALUES (${id}, ${show_title},${series_length},${bio})`)
    client.query('SELECT * FROM shows').then((result) => {
        response.send(result.rows)
    })
})

router.post('/NewActors', (request, response) => {
    let id = (request.body['ID'] * Math.random()) * 10000003
    let actorName = request.body['Actors_name']
    client.query(`INSERT INTO Actors VALUES (${id}, ${actorName})`)
    client.query('SELECT * FROM Actors')
    .then((result) => {
        response.send(result.rows)
    }).catch((error)=>{
    	console.log(error)
    })
})

router.put('/Shows/:id',(request,response)=>{	
	let id = request.params.id
	client.query(`UPDATE Shows SET Show_title='NewStuff', Series_Length=12 WHERE ID = ${id}`)
	client.query(`SELECT * FROM shows WHERE ID = ${id}`)
	.then((result)=>{
		response.send(result.rows)
	})
	.catch((error)=>{
		console.log(error)
	})
})
router.put('/Actors/:id',(request,response)=>{	
	let id = request.params.id
	client.query(`UPDATE Shows SET Show_title='NewStuff', Series_Length=12 WHERE ID = ${id}`)
	client.query(`SELECT * FROM shows WHERE ID = ${id}`)
	.then((result)=>{
		response.send(result.rows)
	})
	.catch((error)=>{
		console.log(error)
	})
})

router.delete('/')


module.exports = router
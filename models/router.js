const express = require('express')
const router = express.Router()
const { Client } = require('pg')

const connectionString = 'postgresql://sithis@localhost:5432/netflix_series'
const client = new Client({
    connectionString: connectionString,
})
let errorMiddleware = function(error){
    console.log(error.message, 'OH no you broke my cheese')
    client.end()
}

client.connect()

//ALL SHOW AND INFORMTION
router.get('/Shows', (request, response) => {
    client.query('SELECT show_title,series_length,bio FROM shows')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})
router.get('/Shows/:id', (request, response) => {
    let id = request.params.id
    client.query('SELECT show_title,series_length,bio FROM shows')
        .then((result) => {
            response.send(result.rows[id])
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})
//ALL ACTORS 
router.get('/Actors', (request, response) => {
    client.query('SELECT actor_name FROM actors')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})

router.get('/Actors/:id', (request, response) => {
    let id = request.params.id
    client.query('SELECT actor_name FROM actors')
        .then((result) => {
            response.send(result.rows[id])
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})
router.get('/All', (request, response) => {
    client.query('SELECT * FROM shows_actors')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})

router.post('/NewSeries', (request, response) => {
    let id = (request.body['ID'] * Math.random()) * 10000003
    let data = {
        show_title:request.body.show_title,
        series_length:request.body.series_length,
        bio:request.body.bio
    }
    console.log(data)
    client.query(`INSERT INTO shows VALUES (${id}, $1,$2,$3)`,
        [data.show_title,data.series_length,data.bio])
    client.query(`SELECT * FROM shows WHERE id = ${id}`)
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})

router.post('/NewActors', (request, response) => {
    let id = (request.body['ID'] * Math.random()) * 10000003
    let data = {
        actorName:request.body.Actors_name
    }
    console.log(request.body)
    client.query(`INSERT INTO Actors VALUES (${id}, ($1))`,
        [data.actorName])
    client.query('SELECT * FROM Actors')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })

})

router.put('/Shows/:id', (request, response) => {
    let id = request.params.id
    let data = {
        show_title:request.body.show_title,
        series_length: request.body.series_length,
        bio:request.body.bio
    }
    client.query(`UPDATE Shows SET show_title=($1), series_Length=($2), bio=($3) WHERE ID = ${id}`,
        [data.show_title,data.series_length,data.bio])
    client.query(`SELECT * FROM shows WHERE ID = ${id}`)
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })

})
router.put('/Actors/:id', (request, response) => {
    let id = request.params.id
    client.query(`UPDATE Actors SET Actors_name='Ron Swanson' WHERE ID = ${id}`)
    client.query(`SELECT * FROM shows WHERE ID = ${id}`)
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })

})

router.delete('/Actors/:id', (request, response) => {
    let id = request.params.id
    client.query(`DELETE FROM Actors WHERE ID=${id}`)
    client.query(`SELECT * FROM Actors`)
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})
 


module.exports = router
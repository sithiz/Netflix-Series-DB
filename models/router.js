/************************************************************
************ Required Modules for Router to work ************
************************************************************/

const express = require('express')
const router = express.Router()
const { Client } = require('pg')

/*************************************************************
************** Error Handingling *****************************
*************************************************************/
let errorMiddleware = function(error){
    console.log(error.message, 'OH no you broke my cheese')
    client.end()
}

            /****************************************
            Connecntion point and beginning of routes
            ****************************************/
const connectionString = 
'postgresql://sithis@localhost:5432/netflix_series' ;

const client = new Client({
    connectionString: connectionString,
});

 client.connect()

/*****************************************************************
******************** GET Routes **********************************
*****************************************************************/
           
            /****** ALL SHOWS *******/
router.get('/Shows', (request, response) => {
    client.query('SELECT show_title,series_length,bio FROM shows')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})

            /****** SHOWS BY ID *****/
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

            /***** ALL ACTORS *****/ 
router.get('/Actors', (request, response) => {
    client.query('SELECT actor_name FROM actors')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})
            /***** ACTORS BY ID *****/
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
        /***** ALL ACTORS IN THERE SHOWS *****/
router.get('/All', (request, response) => {
    client.query('SELECT * FROM shows_actors')
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })
})

/***********************************************************
***************** ALL POST ROUTES **************************
***********************************************************/

            /***** POSTING NEW SERIES *****/
router.post('/NewSeries', (request, response) => {
    let id = (request.body['ID'] * Math.random()) * 10000003
    let data = {
        show_title:request.body.show_title,
        series_length:request.body.series_length,
        bio:request.body.bio
    }
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

            /***** POSTING NEW ACTORS *****/

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

/*********************************************************
****************** ALL PUT ROUTES ************************
*********************************************************/

            /***** UPDATING SHOW *****/
router.put('/Shows/:id', (request, response) => {
    request.params.id
    let data = {
        id:request.params.id,
        show_title:request.body.show_title,
        series_length: request.body.series_length,
        bio:request.body.bio
    }
    client.query('UPDATE Shows SET show_title=($1), series_Length=($2), bio=($3) WHERE ID = ($4)',
        [data.show_title,data.series_length,data.bio,data.id])
    client.query('SELECT * FROM shows WHERE ID = ($1)',[data.id])
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })

})
            /***** UPDATING ACTORS *****/
router.put('/Actor/:id', (request, response) => {
    let data = {
        id:request.params.id,
        newActor:request.params.newActor
    }
    client
        .query('UPDATE Actors SET Actors_name=($1) WHERE ID = ($2)',
            [data.newActor,data.id])
    client
        .query('SELECT * FROM shows WHERE ID =($1)',
            [data.id])
        .then((result) => {
            response.send(result.rows)
        })
        .catch((error)=>{
            errorMiddleware(error)
        })

})

/******************************************************************
********************* DELETE ROUTE *******************************
******************************************************************/

        /******** DELETE BY ACTOR ID ********/
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
 
        /****** EXPORTING ROUTER ******/

module.exports = router
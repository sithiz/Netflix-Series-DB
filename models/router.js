const { Client } = require('pg')
const connectionString = 'postgresql://sithis@localhost:5432/netflix_series'
const client = new Client({
	connectionString: connectionString,
})
client.connect()

client.query('SELECT * FROM shows',(error,response)=>{
	console.log(response.rows)
	client.end()
})

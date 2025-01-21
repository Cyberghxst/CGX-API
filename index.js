const { loadFunctions } = require('./handlers/loadFunctions')
const { API } = require('easy-api.ts')

// Load the environment variables from the .env file.
process.loadEnvFile()

// Create a new API instance.
const api = new API({
    dots: false,
    reverse: false
})

// Loading each custom function.
loadFunctions.call(api)

// Load the routes.
api.load('routes')

// Connect to the API.
api.connect({
    host: process.env.HOST,
    port: parseInt(process.env.PORT)
})
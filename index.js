

const express = require('express');

require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Express server
const app = express();

// Connection to mongoDB
dbConnection();

// CORS setup
app.use(cors());

const PORT = process.env.PORT;

app.get('/', (req, res) => {

    res.json({
        data: 'Ok'
    })
})


app.listen(3000, () => { 
    console.log("Server running on port ", PORT);
 });
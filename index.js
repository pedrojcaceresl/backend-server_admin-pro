

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

// Read and parse body
app.use(express.json())

const PORT = process.env.PORT;

// Usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
app.use("/api/login", require("./routes/auth"));



app.listen(3000, () => { 
    console.log("Server running on port ", PORT);
 });
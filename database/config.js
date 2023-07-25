const mongoose = require('mongoose');
require("dotenv").config();


const DB_CNN = process.env.DB_CNN;

const dbConnection = async () => {
    try{
            await mongoose.connect(DB_CNN);

            console.log("Db online!!!");

    } catch (err) {
        console.log(err);
        throw new Error('Error trying to connect to the database');
    }
}

module.exports = {
    dbConnection
}



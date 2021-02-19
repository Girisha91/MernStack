const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mangoURI');

// promise but it is not used
// mongoose.connect(db);

// async arrow function
const connectDB = async () => {
    // try catch block if there is any error 
    // for error handling
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("mongo db is connected")
    } catch (err) {
        console.error("Unable to connect to db", err);
        // if there is an error then we need to exit this process using below code
        process.exit(1);
    }
}

// export this module
module.exports = connectDB;
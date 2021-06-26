const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');

if(!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const bookRoutes = require('./api/book/route');

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true, useNewUrlParser: false}));


app.use('/api/book', bookRoutes);


// handle all undefined routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// handle errors
// apparently if next isn't here, 
// express returns an error in the form of
// an html webpage
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
}); 

module.exports = app;
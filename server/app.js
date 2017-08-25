const express = require('express');

const app = express();

const axios = require('axios')

const url = 'http://www.omdbapi.com';

const apikey = '&apikey=8730e0e';

const morgan = require('morgan'); // logger requires morgan

app.use(morgan('dev'));

const movieData = {}


// listening for requests

app.get('/', function (req, res) { // this is a listener
    
    const omdbUrl = url + req.url + apikey;
    
    console.log(omdbUrl);
    console.log(url, req.url, apikey);
    
    if (movieData[req.url] === undefined ) { // no value yet
    
    axios.get(omdbUrl)
        .then( function (response) {

            movieData[req.url] = response.data
            res.json(response.data); // came back from the axios call

        })
        .catch( function (error) {
            res.status(500).end('try again scrub');
        })

    } else {
        res.json(movieData[req.url]);
    }

})




module.exports = app;
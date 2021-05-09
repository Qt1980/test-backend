'use strict';

//Step 1. use'require' to import cors, express, mongoose and app in that order from top to bottom.
const cors = require('cors');

const express = require('express');
const app = express();  

//The line of code below is used to access the req.body package that is sent from the server to the client. It corresponds with lines 40-43.
app.use(express.json());

//The line of code below calls cors so that it can be used in the server.
app.use(cors());

//The line of code below is from mongoosejs.com and was copied in order to import mongoose and connect to the mongoose database.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testGame', {useNewUrlParser: true, useUnifiedTopology: true});

//The line of code below is importing the games.js file from the models folder.
const Game = require('./models/game');


//The line of code below allows us to use the process.env.'variable name'. It loads the dotenv library and calls the config method which loads the variables connected to process.env. Ex: process.env.Port
require('dotenv').config();

//The line of code below creates a PORT variable and assigns the endpoint localhost:3001 or uses 3002 if 3001 is busy.
const PORT = process.env.PORT || 3002;

//The line of code below allows the server to listen at the / endpoint which is equal to localhost:3001. Ex: http://localhost:3001/ = http://localhost:3001
app.get('/', (req, res) => {
  res.send('Game App!');
});

//The line of code below informs the server to listen to the endpoint '/games' and then find games in the database and return them as an object. 
app.get('/games', (req, res) => {
  Game.find({}, (err, databaseResponse) => {
    res.send(databaseResponse);
  });
});


//The line of code below is use to create and save new data into the databse. For now hardcode the data to get started. 'req.body' is the way that we get data from the database when using a post request. This is like a package that contains the data that goes from the client to the server. 
app.post('/games', (req, res) => {
  let newGame = new Game({
    platform: req.body.platform,
    game: req.body.game,
    genre: req.body.genre,
    stars: req.body.stars
  });
  //The line of code below saves the new game data to the database
  newGame.save().then(gameData => {
    res.send(gameData);
  });
})

//The line of code below corresponds with the handleDelete function on the frontend. The front end handleDelete function tells the server which id to locate and delete. We use req.params.id instead of req.body.id to do this request
app.delete('/games/:id', (req, res) => {
  let idToDelete = req.params.id;
  Game.deleteOne({_id: idToDelete}, 
    (err, results) => {
      res.send('File Deleted');
    });
});

//The line of code below allows the server to listen to requests being made of port 3001. If working properly it will console.log the below template literal string  "The server is listening on port 3001". The console.log will display in the server terminal window. 
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
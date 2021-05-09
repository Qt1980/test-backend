const mongoose = require('mongoose');
const {Schema} = mongoose;

// create a games schema
const gameSchema = new Schema ({
  platform: String,
  game: String,
  genre: String,
  stars: Number,
});

//create the model from the schema
const Game = mongoose.model('Game', gameSchema)

//export the schema
module.exports = Game;
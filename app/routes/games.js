let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// game object created from the Schema / model
let game = require('../models/games');

/* GET games List page. READ */
router.get('/', (req, res, next) => {
  // find all games in the games collection
  game.find( (err, games) => {
    console.log(games);
    if(err) {
      return console.error(err);
    }
    else {
      res.render('games/index', {
        title: 'Games',
        games: games
      });
    }
  });
});

// GET the Game Details page in order to add a new Game
router.get('/add', (req, res, next) => {
  res.render('games/details', {
    title: "Add a new Game",
    games: ''
  });
});


module.exports = router;


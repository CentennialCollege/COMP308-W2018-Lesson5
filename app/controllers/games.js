let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// game object created from the Schema / model
let game = require('../models/games');

module.exports.DisplayGamesList = function(req, res, next) {
  game.find((err, games) => {
    console.log(games);
    if (err) {
      return console.error(err);
    } else {
      res.render('games/index', {
        title: 'Games',
        games: games
      });
    }
  });
};

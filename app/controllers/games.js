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

module.exports.DisplayGameDetails = function(req, res, next) {
  res.render('games/details', {
    title: "Add a new Game",
    games: ''
  });
}

module.exports.CreateNewGame = function(req, res, next) {
  let newGame = game({
    "name": req.body.name,
    "cost": req.body.cost,
    "rating": req.body.rating
  });

  game.create(newGame, (err, game) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/games');
    }
  });
}

module.exports.DisplayEditPage = function(req, res, next) {
  try {
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

    game.findById(id, (err, games) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        // show the game details view
        res.render('games/details', {
          title: 'Game Details',
          games: games
        });
      }
    });
  } catch (err) {
    console.error(err);
    res.redirect('/errors/404');
  }
}

module.exports.UpdateGame = function(req, res, next) {
  let id = req.params.id;

  let updatedGame = game({
    "_id": id,
    "name": req.body.name,
    "cost": req.body.cost,
    "rating": req.body.rating
  });

  game.update({_id: id}, updatedGame, (err) => {
    if(err) {
      console.error(err);
      res.end(err);
    } else {
      // refresh the Game List
      res.redirect('/games');
    }
  });
}

module.exports.DeleteGame = function(req, res, next) {
  let id = req.params.id;

  game.remove({_id: id}, (err) => {
    if(err) {
      console.error(err);
      res.end(err);
    } else {
      // refresh the games list
      res.redirect('/games');
    }
  });
}

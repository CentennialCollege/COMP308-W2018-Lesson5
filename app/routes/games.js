let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// game object created from the Schema / model
let game = require('../models/games');

let gamesController = require("../controllers/games");

/* GET games List page. READ */
router.get('/', (req, res, next) => {
  // find all games in the games collection
  gamesController.DisplayGamesList(req, res, next);
});

// GET the Game Details page in order to add a new Game
router.get('/add', (req, res, next) => {
  res.render('games/details', {
    title: "Add a new Game",
    games: ''
  });
});

// POST process the Game Details page and create a new Game - CREATE
router.post('/add', (req, res, next) => {

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
});

// GET the Game Details page in order to Edit a new Game - UPDATE
router.get('/:id', (req, res, next) => {

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

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
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

});

// GET - process the delete game id
router.get('/delete/:id', (req, res, next) => {
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
});


module.exports = router;

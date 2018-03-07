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
  gamesController.DisplayGameDetails(req, res, next);
});

// POST process the Game Details page and create a new Game - CREATE
router.post('/add', (req, res, next) => {
  gamesController.CreateNewGame(req, res, next);
});

// GET the Game Details page in order to Edit a new Game - UPDATE
router.get('/:id', (req, res, next) => {
  gamesController.DisplayEditPage(req, res, next);
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  gamesController.UpdateGame(req, res, next);
});

// GET - process the delete game id
router.get('/delete/:id', (req, res, next) => {
  gamesController.DeleteGame(req, res, next);
});


module.exports = router;

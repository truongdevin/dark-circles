var Game = require("./game.js");
var GameView = require("./gameView.js");
var MovingObject = require("./movingObject.js");

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;

var ctx = canvasEl.getContext("2d");
var game = new Game();
var gameView = new GameView(game, ctx)
gameView.start();


var el = document.getElementsByTagName('body')[0];

el.addEventListener("keydown", function() {
  // reset on keypress of 'r' or 'R'
  if (event.keyCode === 82) {
    gameView.reset(new Game(), ctx);
  }

})

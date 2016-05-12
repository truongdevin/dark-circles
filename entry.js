var Game = require("./game.js");
var GameView = require("./gameView.js");
var MovingObject = require("./movingObject.js");

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;

var ctx = canvasEl.getContext("2d");
var game = new Game();
var gameView = new GameView(game, ctx)
// gameView.start();

var gameStart = false;

var el = document.getElementsByTagName('body')[0];
var menu = document.getElementById('menu')

el.addEventListener("keydown", function() {
  if (!gameStart) {
    gameStart = true;
    var canvasEl = document.getElementById("game-canvas");
    var menu = document.getElementById('menu')
    menu.className = "hidden";
    canvasEl.className = "opaque-off"


    gameView.start();
  } else if (event.keyCode === 82) {
    gameView.reset(new Game(), ctx);
  }

});

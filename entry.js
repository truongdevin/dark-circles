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

var el = document.getElementsByTagName('body')[0];

var mainMenu = false;
var instructionPage = false;

el.addEventListener("keydown", function() {
  var menu = document.getElementById('menu')
  var instructions = document.getElementById('instructions');

  if (!mainMenu) {
    mainMenu = true;
    menu.className = "opaque-on-full";
    instructions.className = "opaque-off";

  } else if (!instructionPage) {
    instructionPage = true;
    instructions.className = "opaque-on-full";
    var canvasEl = document.getElementById("game-canvas");
    canvasEl.className = "opaque-off"
    gameView.start();

  } else if (event.keyCode === 82) {
    gameView.reset(new Game(), ctx);
  }

});

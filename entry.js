var Game = require("./game.js");
var GameView = require("./gameView.js");
var MovingObject = require("./movingObject.js");

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;

var ctx = canvasEl.getContext("2d");
var game = new Game();
new GameView(game, ctx).start();

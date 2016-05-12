var Game = require('./game.js');

var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.whiteBloodCell = this.game.addWhiteBloodCell();
};

GameView.prototype.start = function (canvasEl) {
    this.bindKeyHandlers();
    // document.addEventListener("keydown", this.handleKeyDown.bind(this), false);

    var self = this;
    var refresh = function() {
      self.game.step();
      self.game.draw(self.ctx);
    };


    this.interval = setInterval(refresh,20)

    // var interval = interval || setInterval(refresh, 20);
};

// GameView.prototype.handleKeyDown = function (e) {
//   var whiteBloodCell = this.whiteBloodCell;
//     if (e.keyCode === 87) {
//       Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,-0.25]) : "";
//     }
//     if (e.keyCode === 65) {
//       Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([-0.25,0]) : "";
//     }
//     if (e.keyCode === 83) {
//       Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,0.25]) : "";
//     }
//     if (e.keyCode === 68) {
//       Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([0.25,0]) : "";
//     }
//   }

GameView.prototype.bindKeyHandlers = function () {
  var whiteBloodCell = this.whiteBloodCell;
  key('w', function() {Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,-0.25]) : ""});
  key('a', function() {Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([-0.25,0]) : ""});
  key('s', function() {Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,0.25]) : ""});
  key('d', function() {Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([0.25,0]) : ""});

  key('space', function() {whiteBloodCell.fireBullet()});
};

GameView.prototype.reset = function (game, ctx) {
  var canvas = document.getElementById("game-canvas");
  var gameOver = document.getElementById('game-over');
  var gameWon = document.getElementById('game-won');

  gameOver.className="opaque-on-full";
  gameWon.className="opaque-on-full";
  canvas.className="opaque-off";
  this.ctx = ctx;
  this.game = game;
  clearInterval(this.interval);
  this.whiteBloodCell = this.game.addWhiteBloodCell();
  this.start();
};


module.exports = GameView;

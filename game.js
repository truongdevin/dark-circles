var Intruder = require("./intruder.js");
var WhiteBloodCell = require("./whiteBloodCell");
var Bullet = require("./bullet");

var Game = function () {
  this.intruders = [];
  this.whiteBloodCells = [];
  this.bullets = [];

  this.addIntruders();
}

Game.BG_COLOR="black";
Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_INTRUDERS = 100;

Game.prototype.addIntruders = function() {
  for (var i = 0; i < Game.NUM_INTRUDERS; i++) {
    this.intruders.push(new Intruder({
      pos: this.randomPosition(),
      game: this,
      color: "white"
    }));
  }
};

Game.prototype.addWhiteBloodCell = function() {
  var ship = new WhiteBloodCell({
    pos: this.randomPosition(),
    game: this,
    color: "red"
  });
  this.whiteBloodCells.push(ship);
  return ship;
};

Game.prototype.addBullet = function (bullet) {
  this.bullets.push(bullet);
}

Game.prototype.allObjects = function () {

  //determines priority of the resize
  return this.intruders.concat(this.whiteBloodCells, this.bullets);
  // return this.whiteBloodCells.concat(this.intruders, this.bullets);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function(object) {
    object.move();
  });

};

Game.prototype.randomPosition = function() {
  var x = Game.DIM_X * Math.random();
  var y = Game.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.wrap = function (pos) {
  pos[0] = pos[0] > 0 ? pos[0] % Game.DIM_X : Game.DIM_X
  pos[1] = pos[1] > 0 ? pos[1] % Game.DIM_Y : Game.DIM_Y

  return [pos[0], pos[1]];
};

Game.prototype.checkCollosions = function () {
  var self = this;

  this.allObjects().forEach(function(object1) {
    self.allObjects().forEach(function(object2) {
      if (object1 === object2) {
        return;
      }

      if (object1.isCollidedWith(object2)) {
        object1.collideWith(object2);
        console.log("COLLIDED");
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollosions();
};

Game.prototype.remove = function (object) {
  if (object instanceof Bullet) {
   this.bullets.splice(this.bullets.indexOf(object), 1);
 } else if (object instanceof Intruder) {
    var idx = this.intruders.indexOf(object);
    this.intruders.splice(idx,1);
 } else if (object instanceof WhiteBloodCell) {
   this.whiteBloodCells.splice(this.whiteBloodCells.indexOf(object), 1);
 }
};

module.exports = Game;

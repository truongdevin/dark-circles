var Intruder = require("./intruder.js");
var EliteIntruder = require("./eliteIntruder.js");
var WhiteBloodCell = require("./whiteBloodCell");
var Bullet = require("./bullet");

var Game = function () {
  this.intruders = [];
  this.eliteIntruders = [];
  this.whiteBloodCells = [];
  this.bullets = [];

  this.addIntruders();
  this.addEliteIntruders();
}

Game.BG_COLOR="black";
Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_INTRUDERS = 100;
Game.NUM_ELITES = 20;

Game.prototype.addIntruders = function() {
  for (var i = 0; i < Game.NUM_INTRUDERS; i++) {
    this.intruders.push(new Intruder({
      pos: this.randomPosition(),
      game: this,
      color: "white"
    }));
  }
};

Game.prototype.addEliteIntruders = function() {
  for (var i = 0; i < Game.NUM_ELITES; i++) {
    this.eliteIntruders.push(new EliteIntruder({
      pos: this.randomPosition(),
      game: this,
      color: "red"
    }));
  }
};

Game.prototype.addWhiteBloodCell = function() {
  var ship = new WhiteBloodCell({
    pos: this.randomPosition(),
    game: this,
    color: "orange"
  });
  this.whiteBloodCells.push(ship);
  return ship;
};

Game.prototype.addBullet = function (bullet) {
  this.bullets.push(bullet);
}

Game.prototype.allObjects = function () {
  return this.intruders.concat(this.whiteBloodCells, this.bullets, this.eliteIntruders);
};

Game.prototype.draw = function (ctx) {
  // Game.DIM_X = window.innerWidth;
  // Game.DIM_Y = window.innerHeight;
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(object) {

    if(object.pos[0] + object.vel[0] > Game.DIM_X-object.radius || object.pos[0] + object.vel[0] < object.radius) {
        object.vel[0] *= -1;
    }
    if(object.pos[1] + object.vel[1] > Game.DIM_Y-object.radius || object.pos[1] + object.vel[1] < object.radius) {
      object.vel[1] *= -1;
    }

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


// no longer used, but allows you to wrap the objects in the canvas
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
        // console.log("COLLIDED");
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
 } else if (object instanceof EliteIntruder) {
   this.eliteIntruders.splice(this.eliteIntruders.indexOf(object), 1);
 }
};

module.exports = Game;

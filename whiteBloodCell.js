var MovingObject = require("./movingObject");
var Util = require("./util");
var Bullet = require("./bullet.js");

var WhiteBloodCell = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = hash.radius || 5;
  hash.vel = [0,0];
  MovingObject.call(this, hash);
};

Util.inherits(WhiteBloodCell, MovingObject);

WhiteBloodCell.prototype.type = "WhiteBloodCell";

WhiteBloodCell.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

WhiteBloodCell.prototype.move = function() {
  this.vel[0]*=0.99;
  this.vel[1]*=0.99;
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

WhiteBloodCell.prototype.fireBullet = function () {
  // can only shoot if self is large enough
  if (this.radius > 5) {
    var bulletVel = Util.scale(
      Util.dir(this.vel),
      3
    );
    var bullet = new Bullet({
      pos: this.pos.slice(),
      vel: bulletVel,
      game: this.game
    });
    this.game.addBullet(bullet);
    this.radius -= 0.5;
  }
};


module.exports = WhiteBloodCell;

var MovingObject = require("./movingObject");
var Util = require("./util");
var WhiteBloodCell = require("./whitebloodcell");

var Bullet = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = 5;
  MovingObject.call(this, hash);
};

Bullet.prototype.type = "Bullet";

Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

Bullet.prototype.collideWith = function (object) {
  if (object.type === "Intruder") {
    object.remove();
    this.remove();
  }
};


module.exports = Bullet;

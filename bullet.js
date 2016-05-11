var MovingObject = require("./movingObject");
var Util = require("./util");
var WhiteBloodCell = require("./whiteBloodCell");

var Bullet = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = 4;
  MovingObject.call(this, hash);
};


Util.inherits(Bullet, MovingObject);
Bullet.prototype.type = "Bullet";

Bullet.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

// Bullet.prototype.collideWith = function (otherObject) {
//   // if (otherObject.type === "Intruder") {
//   //   // object.remove();
//   //   otherObject.radius+=5;
//   //   this.remove();
//   // }
// };


module.exports = Bullet;

var MovingObject = require("./movingObject");
var Util = require("./util");

var EliteIntruder = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = hash.radius || Math.floor(Math.random()*10+5);
  hash.vel = hash.vel || Util.randomVec(0.2);
  MovingObject.call(this, hash);
}
Util.inherits(EliteIntruder, MovingObject);
EliteIntruder.prototype.type = "EliteIntruder";

EliteIntruder.prototype.collideWith = function (otherObject) {

  if (otherObject.type === "EliteIntruder") return;

  if (otherObject.type === "WhiteBloodCell") {
    if (otherObject.radius < 2) {
      otherObject.game.remove(otherObject);
    }
    // this.radius += otherObject.radius/this.radius;
    this.radius += 0.5;
    otherObject.radius*=0.90;
  }

  if (otherObject.type === "Bullet") {
    if (this.radius < 5) {
      this.game.remove(this);
    }
    this.radius -= 0.5;
    otherObject.radius*=0.9;
  }

};

module.exports = EliteIntruder;

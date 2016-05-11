var MovingObject = require("./movingObject");
var Util = require("./util");

var EliteIntruder = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = hash.radius || Math.floor(Math.random()*15+2);
  hash.vel = hash.vel || Util.randomVec(0.2);
  MovingObject.call(this, hash);
}
Util.inherits(EliteIntruder, MovingObject);
EliteIntruder.prototype.type = "EliteIntruder";

EliteIntruder.prototype.collideWith = function (otherObject) {
  // if (otherObject.type === "Intruder") {
  //   // object.remove();
  //   otherObject.radius+=5;
  //   this.remove();
  // }
};

module.exports = EliteIntruder;

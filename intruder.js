var MovingObject = require("./movingObject");
var Util = require("./util");

var Intruder = function (hash) {
  hash.color = hash.color || "white"; // red , crimson, aqua
  hash.radius = hash.radius || Math.floor(Math.random()*10+2);
  hash.vel = hash.vel || Util.randomVec(0.2);
  MovingObject.call(this, hash);
}
Util.inherits(Intruder, MovingObject);
Intruder.prototype.type = "Intruder";

module.exports = Intruder;

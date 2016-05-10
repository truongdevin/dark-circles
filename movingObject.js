
var MovingObject = function (hash) {
  this.pos = hash['pos'];
  this.vel = hash['vel'];
  this.radius = hash['radius'];
  this.color = hash['color'];
  this.game = hash['game'];
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var distance = Math.sqrt(
    Math.pow(this.pos[0]-otherObject.pos[0],2) + Math.pow(this.pos[1]-otherObject.pos[1],2)
  );
  return distance < (this.radius + otherObject.radius);
};

MovingObject.prototype.collideWith = function (otherObject) {
  if (this.radius > otherObject.radius) {
    this.radius += otherObject.radius/this.radius;
  } else if (this.radius < otherObject.radius){
    if (this.radius < 1) {
      this.game.remove(this);
    }
    this.radius -= 0.5;
    // this.radius -= this.radius/otherObject.radius;
  }
  // this.game.remove(otherObject);
  // this.game.remove(this);
};

MovingObject.prototype.remove = function () {
  this.game.remove(this);
};

module.exports = MovingObject;

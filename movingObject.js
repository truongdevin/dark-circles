
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
  return distance <= (this.radius + otherObject.radius);
};

MovingObject.prototype.collideWith = function (otherObject) {
  // these two if statements ensure the bullet and cell do not interact with each other
  if (this.type === "WhiteBloodCell" && otherObject.type === "Bullet") return;
  if (this.type === "Bullet" && otherObject.type === "WhiteBloodCell") return;

  if (this.radius < otherObject.radius){
    if (this.radius < 2) {
      this.game.remove(this);
    }
    otherObject.radius += this.radius/otherObject.radius;
    this.radius -= 0.5;
    // this.radius -= this.radius/otherObject.radius;
  }
};

MovingObject.prototype.remove = function () {
  this.game.remove(this);
};

module.exports = MovingObject;

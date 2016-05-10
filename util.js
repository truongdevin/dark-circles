module.exports = {
  inherits: function (ChildClass, ParentClass) {
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate;
    ChildClass.prototype.constructor = ChildClass;
  },

  // Normalize the length of the vector to 1, maintaining direction.
  dir: function (vec) {
    var norm = this.norm(vec);
    return this.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist: function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm: function (vec) {
    return this.dist([0, 0], vec);
  },

  scale: function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  randomVec: function (length) {
    var deg = 2*Math.PI*Math.random();
    var plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
    var plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
    var x = Math.random()*length * plusOrMinusX;
    var y = Math.sqrt(length*length - x*x) * plusOrMinusY;
    return [x,y];
  }
};

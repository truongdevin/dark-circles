/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(8);
	var MovingObject = __webpack_require__(3);
	
	var canvasEl = document.getElementById("game-canvas");
	canvasEl.width = Game.DIM_X;
	canvasEl.height = Game.DIM_Y;
	
	var ctx = canvasEl.getContext("2d");
	var game = new Game();
	var gameView = new GameView(game, ctx)
	gameView.start();
	
	
	var el = document.getElementsByTagName('body')[0];
	
	el.addEventListener("keydown", function() {
	  // reset on keypress of 'r' or 'R'
	  if (event.keyCode === 82) {
	    gameView.reset(new Game(), ctx);
	  }
	
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Intruder = __webpack_require__(2);
	var EliteIntruder = __webpack_require__(5);
	var WhiteBloodCell = __webpack_require__(6);
	var Bullet = __webpack_require__(7);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
	var Intruder = function (hash) {
	  hash.color = hash.color || "black"; // red , crimson, aqua
	  hash.radius = hash.radius || Math.floor(Math.random()*15+2);
	  hash.vel = hash.vel || Util.randomVec(0.3);
	  MovingObject.call(this, hash);
	}
	Util.inherits(Intruder, MovingObject);
	Intruder.prototype.type = "Intruder";
	
	module.exports = Intruder;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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
	  // this.game.wrap(this.pos);
	};
	
	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  var distance = Math.sqrt(
	    Math.pow(this.pos[0]-otherObject.pos[0],2) + Math.pow(this.pos[1]-otherObject.pos[1],2)
	  );
	  return distance <= (this.radius + otherObject.radius);
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	
	  if (otherObject.type === "EliteIntruder") return;
	
	  if (this.radius < otherObject.radius){
	    if (this.radius < 2) {
	      this.game.remove(this);
	    }
	    otherObject.radius += this.radius/otherObject.radius;
	    // this.radius -= 0.5;
	    this.radius*=0.90;
	    // this.radius -= this.radius/otherObject.radius;
	  }
	};
	
	MovingObject.prototype.remove = function () {
	  this.game.remove(this);
	};
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	var Bullet = __webpack_require__(7);
	
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
	  // this.game.wrap(this.pos);
	};
	
	WhiteBloodCell.prototype.fireBullet = function () {
	  // can only shoot if self is large enough
	  if (this.radius > 5) {
	    var bulletVel = Util.scale(
	      Util.dir(this.vel),
	      3
	    );
	
	    var offset = Util.scale(
	      Util.dir(this.vel),
	      this.radius + 2
	    );
	
	    var bullet = new Bullet({
	      pos: [this.pos[0] + offset[0] ,this.pos[1] + offset[1]],
	      vel: bulletVel,
	      game: this.game,
	      color: this.color
	    });
	    this.game.addBullet(bullet);
	    this.radius -= 1;
	  }
	};
	
	
	module.exports = WhiteBloodCell;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	var WhiteBloodCell = __webpack_require__(6);
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	
	var GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  this.whiteBloodCell = this.game.addWhiteBloodCell();
	};
	
	GameView.prototype.start = function (canvasEl) {
	    this.bindKeyHandlers();
	    // document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
	
	    var self = this;
	    var refresh = function() {
	      self.game.step();
	      self.game.draw(self.ctx);
	    };
	
	
	    this.interval = setInterval(refresh,20)
	
	    // var interval = interval || setInterval(refresh, 20);
	};
	
	// GameView.prototype.handleKeyDown = function (e) {
	//   var whiteBloodCell = this.whiteBloodCell;
	//     if (e.keyCode === 87) {
	//       Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,-0.25]) : "";
	//     }
	//     if (e.keyCode === 65) {
	//       Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([-0.25,0]) : "";
	//     }
	//     if (e.keyCode === 83) {
	//       Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,0.25]) : "";
	//     }
	//     if (e.keyCode === 68) {
	//       Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([0.25,0]) : "";
	//     }
	//   }
	
	GameView.prototype.bindKeyHandlers = function () {
	  var whiteBloodCell = this.whiteBloodCell;
	  key('w', function() {Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,-0.25]) : ""});
	  key('a', function() {Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([-0.25,0]) : ""});
	  key('s', function() {Math.abs(whiteBloodCell.vel[1]) < 1 ? whiteBloodCell.power([0,0.25]) : ""});
	  key('d', function() {Math.abs(whiteBloodCell.vel[0]) < 1 ? whiteBloodCell.power([0.25,0]) : ""});
	
	  key('space', function() {whiteBloodCell.fireBullet()});
	};
	
	GameView.prototype.reset = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  clearInterval(this.interval);
	  this.whiteBloodCell = this.game.addWhiteBloodCell();
	  this.start();
	};
	
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
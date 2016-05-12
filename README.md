# [Dark Circles](https://truongdevin.github.io/dark-circles)

Dark Circles is a browser based Javascript game utilizing Canvas.
It draws influence from the popular game, Agar.io.

![Title](/images/menu.png)

## Goal

You start out as a tiny circle. Your goal is to consume all the white circles and destroy all the red ones. You can absorb white circles smaller than you but red circles will absorb you no matter your size. The only way to destroy the red ones is by shooting out pieces of yourself. But be careful, shooting causes your size to decrease and causes white circles caught in its path to increase its size. Do you have what it takes to become the Chosen Circle?

Use W-A-S-D to move, SPACEBAR to shoot.

![Game](/images/game.png)

## Implementation Details

### Shrinking on touch
The smooth shrinking and absorbing effect on contact circles is achieved by setting the absorbing object to increase at a ratio of their individual radius and by setting the shrinking object to decrease by 10% of its current size every frame. This was set somewhat arbitarily in order to balance the game.

```Javascript
if (this.radius < otherObject.radius){
  if (this.radius < 2) {
    this.game.remove(this);
  }
  otherObject.radius += this.radius/otherObject.radius;
  this.radius*=0.90;
}
```

### Future Directions for the Project
- Buffer when spawning so you don't die immediately if you're unlucky
- Visual feedback for the direction the circle is facing
- More enemy variety
- Final boss?

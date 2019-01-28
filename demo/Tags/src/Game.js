class Game {
  constructor() {

  }

  init() {
    //  Initialise the canvas
    gameNs.game.canvas = document.createElement("canvas");
    gameNs.game.canvas.id = 'mycanvas';
    gameNs.game.canvas.width = window.innerWidth;
    gameNs.game.canvas.height = window.innerHeight;
    gameNs.game.ctx = gameNs.game.canvas.getContext("2d");
    document.body.appendChild(gameNs.game.canvas);

    //  Initialise game objects
    gameNs.game.collisionManager = new CollisionManager();
    gameNs.game.player = new PolygonCollider([new Vector2(100, 100), new Vector2(150, 100), new Vector2(150, 150), new Vector2(100, 150)], ['player'], ['door']);
    gameNs.game.collisionManager.addPolygonCollider(gameNs.game.player); //  Player is at position 0 in our array.
    gameNs.game.collisionManager.addPolygonCollider(new PolygonCollider([new Vector2(400, 50), new Vector2(420, 50), new Vector2(420, 150), new Vector2(400, 150)], ['door']));
    gameNs.game.collisionManager.addPolygonCollider(new PolygonCollider([new Vector2(600, 25), new Vector2(610, 10), new Vector2(630, 40), new Vector2(650, 70), new Vector2(660, 90), new Vector2(640, 120), new Vector2(620, 150), new Vector2(600, 80)], ['rock']));

    var instructions = "Controls for demo: \n   Movement: WASD";
    console.log(instructions);

    document.addEventListener('keydown', function (event) {
      event.preventDefault();
      //  Movement up and down
      if (event.keyCode == 87) { //  W key.
        gameNs.game.player.move(0, -5);
      } else if (event.keyCode == 83) { //  S key.
        gameNs.game.player.move(0, 5);
      }
      //  Movement left and right.
      if (event.keyCode == 65) { //  A key.
        gameNs.game.player.move(-5, 0);
      } else if (event.keyCode == 68) { //  D key.
        gameNs.game.player.move(5, 0);
      }
    });
  }

  update() {
    //  Update game objects.
    gameNs.game.collisionManager.checkAllColliders();
    if (gameNs.game.collisionManager.polygonCollidedWithTag(gameNs.game.player, 'rock')) {
      console.log('collided with rock.');
    }
    //  Draw new frame.
    gameNs.game.render();
    // Recursive call to Update method.
    window.requestAnimationFrame(gameNs.game.update);
  }


  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.collisionManager.render(this.ctx);
  }
}
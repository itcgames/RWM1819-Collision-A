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
    gameNs.game.player = new PolygonCollider([new Vector2(10, 10), new Vector2(100, 50), new Vector2(25, 40)]);
    gameNs.game.collisionManager.addPolygonCollider(gameNs.game.player);
    gameNs.game.collisionManager.addPolygonCollider(new PolygonCollider([new Vector2(600, 125), new Vector2(610, 110), new Vector2(630, 140), new Vector2(650, 170), new Vector2(660, 190), new Vector2(640, 220), new Vector2(620, 250), new Vector2(600, 180)]));

    var instructions = "Controls for demo: \n   Movement: WASD \n   Rotation: left and right arrows \n   Scale: up and down arrows";
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
      //  Rotation
      if (event.keyCode == 37) { //  Left arrow.
        gameNs.game.player.rotate(-5);
      } else if (event.keyCode == 39) { //  Right arrow.
        gameNs.game.player.rotate(5);
      }
      //  Scale
      if (event.keyCode == 38) { //  Up arrow.
        gameNs.game.player.scale(2);
      } else if (event.keyCode == 40) { //  Down arrow. 
        gameNs.game.player.scale(0.5);
      }
    });
  }

  update() {
    //  Update game objects.
    gameNs.game.collisionManager.checkPolygonColliderArray();
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
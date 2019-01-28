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
    gameNs.game.box = new BoxCollider(new Vector2(300, 400), 200, 50);
    gameNs.game.circle = new CircleCollider(new Vector2(120, 120), 50);

    gameNs.game.collisionManager = new CollisionManager();
    gameNs.game.collisionManager.addBoxCollider(gameNs.game.box);
    gameNs.game.collisionManager.addCircleCollider(gameNs.game.circle);

    var instructions = "Controls for demo: \n   Movement: WASD \n";
    console.log(instructions);

    document.addEventListener('keydown', function (event) {
      event.preventDefault();

      //  Movement up and down
      if (event.keyCode == 87) { //  W key.
        gameNs.game.circle.move(0, -5);
      } else if (event.keyCode == 83) { //  S key.
        gameNs.game.circle.move(0, 5);
      }
      //  Movement left and right.
      if (event.keyCode == 65) { //  A key.
        gameNs.game.circle.move(-5, 0);
      } else if (event.keyCode == 68) { //  D key.
        gameNs.game.circle.move(5, 0);
      }

      //  Movement up and down
      if (event.keyCode == 38) { //  Up arrow.
        gameNs.game.box.move(0, -5);
      } else if (event.keyCode == 40) { //  Down arrow.
        gameNs.game.box.move(0, 5);
      }
      //  Movement left and right.
      if (event.keyCode == 37) { //  Left arrow.
        gameNs.game.box.move(-5, 0);
      } else if (event.keyCode == 39) { //  Right arrow.
        gameNs.game.box.move(5, 0);
      }
    });
  }

  update() {
    gameNs.game.collisionManager.checkCircleAndBoxColliderArray();

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
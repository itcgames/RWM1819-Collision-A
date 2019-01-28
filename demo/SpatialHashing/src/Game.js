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
    //  Be wary of making this variable true as there is a major performance hit, and thus should only be used for debugging purposes.
    gameNs.game.collisionManager.renderGrid = false;
    //  The player is a bigger circle then the others.
    gameNs.game.player = new CircleCollider(new Vector2(100, 100), 20, ["player"]);
    gameNs.game.collisionManager.addCircleCollider(gameNs.game.player); //  Player is at position 0 in our array.

    for (var i = 0; i < 1000; i++) {
      //  Create a npc collider that is told to ignore the collisions of other npcs.
      gameNs.game.collisionManager.addCircleCollider(new CircleCollider(new Vector2(Math.random() * window.innerWidth, Math.random() * window.innerHeight), 10, ["npc"], ["npc"]));
    }

    var instructions = "Controls for demo: \n   Movement: WASD\n You are the bigger circle.";
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
    //  We create an imaginary grid by which we can seperate objects.
    //  In this example the width and height of each "tile" of the grid is 25.
    //  Comment out this line to see what objects are checked against the player without spatial hashing.
    gameNs.game.collisionManager.updateSpatialHashing(50, 50);
    //  Update game objects.
    gameNs.game.collisionManager.checkCircleColliderArray();
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
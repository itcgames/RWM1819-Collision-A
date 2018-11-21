class Game
{
    constructor() {

    }

    init() {
        //  Initialise the canvas
        gameNs.game.canvas = document.createElement("canvas")
        gameNs.game.canvas.id = 'mycanvas'
        gameNs.game.canvas.width = window.innerWidth
        gameNs.game.canvas.height = window.innerHeight
        gameNs.game.ctx = gameNs.game.canvas.getContext("2d")
        document.body.appendChild(gameNs.game.canvas)

        //  Initialise game objects
        gameNs.game.collisionManager = new CollisionManager();
        gameNs.game.player = new PolygonCollider([new Vector2(600,25), new Vector2(610, 10), new Vector2(630, 40), new Vector2(650, 70), new Vector2(660, 90), new Vector2(640, 120), new Vector2(620, 150), new Vector2(600, 80)]);
        gameNs.game.collisionManager.addPolygonCollider(gameNs.game.player);    //  Player is at position 0 in our array.

        var instructions = "Controls for demo: \n   Movement: WASD \n   Rotation: left and right arrows \n   Scale: up and down arrows";
        console.log(instructions);

        document.addEventListener('keydown', function(event) {
            event.preventDefault();   

            //  Movement up and down
            if(event.keyCode == 87) {   //  W key.
                gameNs.game.player.shape.move(0, -5);  
            } else if(event.keyCode == 83) {    //  S key.
                gameNs.game.player.shape.move(0, 5);                  
            }
            //  Movement left and right.
            if(event.keyCode == 65) {   //  A key.
                gameNs.game.player.shape.move(-5, 0);  
            } else if(event.keyCode == 68) {    //  D key.
                gameNs.game.player.shape.move(5, 0);                  
            }
            //  Rotation
            if(event.keyCode == 37) {   //  Left arrow.
                gameNs.game.player.shape.rotate(-5);  
            } else if(event.keyCode == 39) {    //  Right arrow.
                gameNs.game.player.shape.rotate(5);                   
            }
            //  Scale
            if (event.keyCode == 38) {  //  Up arrow.
                gameNs.game.player.shape.scale(2);   
            } else if (event.keyCode == 40) {   //  Down arrow. 
                gameNs.game.player.shape.scale(0.5);   
            }
        });
    }

    update() {
        //  Update game objects.
        gameNs.game.collisionResults = gameNs.game.collisionManager.checkPolygonColliderArray();
        //  Draw new frame.
        gameNs.game.render();
        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }


    render() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.collisionManager.render(this.ctx);
    }
}
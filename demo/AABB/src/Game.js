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
        gameNs.game.player = new BoxCollider(new Vector2(0,0), 50, 50);
        gameNs.game.collisionManager.addBoxCollider(gameNs.game.player);
        gameNs.game.collisionManager.addBoxCollider(new BoxCollider(new Vector2(100,100), 50, 50));

        var instructions = "Controls for demo: \n   Movement: WASD\n    Scale: up and down arrows";
        console.log(instructions);

        document.addEventListener('keydown', function(event) {
            event.preventDefault(); 
            //  Movement up and down
            if(event.keyCode == 87) {   //  W key.
                gameNs.game.player.move(0, -5);  
            } else if(event.keyCode == 83) {    //  S key.
                gameNs.game.player.move(0, 5);                  
            }
            //  Movement left and right.
            if(event.keyCode == 65) {   //  A key.
                gameNs.game.player.move(-5, 0);  
            } else if(event.keyCode == 68) {    //  D key.
                gameNs.game.player.move(5, 0);                  
            }

            //  Scale
            if (event.keyCode == 38) {  //  Up arrow.
                gameNs.game.player.scale(2);   
            } else if (event.keyCode == 40) {   //  Down arrow. 
                gameNs.game.player.scale(0.5);   
            }
        });
    }

    update() {
        //  Update game objects.
        gameNs.game.collisionManager.checkBoxColliderArray();
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
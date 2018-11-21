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
        gameNs.game.player = new PolygonCollider(new Polygon([new Vector2(600,225), new Vector2(610, 210), new Vector2(630, 240), new Vector2(650, 280), new Vector2(640, 290), new Vector2(630, 320), new Vector2(620, 350), new Vector2(600, 280)]));
        gameNs.game.collisionManager.addPolygonCollider(gameNs.game.player);    //  Player is at position 0 in our array.

        document.addEventListener('keydown', function(event) {
            event.preventDefault();            
            if(event.keyCode == 37) {   //  Left arrow.
                gameNs.game.player.shape.move(-5, 0);  
            } else if(event.keyCode == 39) {    //  Right arrow.
                gameNs.game.player.shape.move(5, 0);                  
            }

            if (event.keyCode == 38) {  //  Up arrow.
                gameNs.game.player.shape.rotate(5);   
            } else if (event.keyCode == 40) {   //  Down arrow. 
                gameNs.game.player.shape.rotate(-5);   
            }

            if (event.keyCode == 32) {  //  Space.
                gameNs.game.player.shape.scale(2);   
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
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
        gameNs.game.collisionManager.addPolygonCollider(new PolygonCollider([new Vector2(10,10), new Vector2(100, 50), new Vector2(25, 40)]));
        gameNs.game.collisionManager.addPolygonCollider(new PolygonCollider([new Vector2(600,500), new Vector2(510, 600), new Vector2(200, 400)]));
        gameNs.game.collisionManager.addPolygonCollider(new PolygonCollider([new Vector2(500,500), new Vector2(310, 600), new Vector2(100, 400)]));
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
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.collisionManager.render(this.ctx);
    }
}
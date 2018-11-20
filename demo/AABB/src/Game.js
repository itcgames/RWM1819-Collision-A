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
        gameNs.game.collisionManager.addBoxCollider(new BoxCollider(new Rectangle(new Vector2(0,0), 50, 50)));
        gameNs.game.collisionManager.addBoxCollider(new BoxCollider(new Rectangle(new Vector2(120,520), 50, 50)));
        gameNs.game.collisionManager.addBoxCollider(new BoxCollider(new Rectangle(new Vector2(100,500), 50, 50)));
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
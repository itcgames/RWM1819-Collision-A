class Polygon extends Shape
{
    /**
     * The default constructor of the class.
     * @param {Vector2[]} vertices 
     */
    constructor(vertices) {
        super(vertices[0])  //  Call the parent classes constructor.
        this.setVertices(vertices)
    }
}
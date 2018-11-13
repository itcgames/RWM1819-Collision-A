class Circle extends Shape
{
    /**
     * The default constructor of the class.
     * @param {Vector2} position 
     * @param {Scalar} radius 
     */
    constructor(position, radius) {
        super(position)  //  Call the parent classes constructor.
        this.radius = radius
        this.isCircle = true
    }
}
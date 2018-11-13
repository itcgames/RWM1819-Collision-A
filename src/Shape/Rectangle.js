class Rectangle extends Shape
{
    /**
     * Default constructor for the class.
     * @param {Vector2} position 
     * @param {Scalar} width 
     * @param {Scalar} height 
     */
    constructor(position, width, height) {
        super(position);    //  Call the parent classes constructor.
        this.width = width;
        this.height = height;
    }
}
class Circle extends Shape
{
    constructor(position, orientation, radius)
    {
        super(position, orientation)
        this.radius = radius
        this.isCircle = true
    }
}
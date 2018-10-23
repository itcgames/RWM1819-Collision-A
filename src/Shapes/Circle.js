class Circle
{
    ///<summary>
    /// Objects default constructor.
    ///</summary>
    constructor(position, radius)
    {
        this.position = position
        this.radius = radius
    }

    ///<summary>
    /// Gets the position of the circle
    ///</summary>
    get position()
    {
        return this.position
    }

    ///<summary>
    /// Sets the position of the circle
    ///</summary>
    ///<param='position'>The new position of the circle</param>
    set position(position)
    {
        this.position = position
    }

    ///<summary>
    /// Gets the radius of the circle
    ///</summary>
    get radius()
    {
        return this.position
    }

    ///<summary>
    /// Sets the radius of the circle
    ///</summary>
    ///<param='radius'>The new radius of the circle</param>
    set radius(radius)
    {
        this.radius = radius
    }

    ///<summary>
    /// Checks if the current circle and the passed circle are colliding
    ///</summary>
    ///<param='otherCircle'>Another circle object to check against</param>
    intersectsCircle(otherCircle)
    {
        //  Circle Collision
        var distance = MathHelper.distance(this.position, otherCircle.position)
        if (distance < this.radius + otherCircle.radius)
        {
            return true
        }
        return false
    }
}
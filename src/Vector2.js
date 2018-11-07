class Vector2
{
    ///<summary>
    /// Objects default constructor.
    ///</summary>
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }

    dotProduct(otherVector)
    {
        return (this.x * otherVector.x) + (this.y * otherVector.y)
    }

    perp()
    {
        return new Vector2(-this.y, this.x)        
    }

    add(otherVector)
    {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y)
    }

    subtract(otherVector)
    {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y)
    }
}
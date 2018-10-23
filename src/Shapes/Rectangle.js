class Rectangle 
{
    ///<summary>
    /// Objects default constructor.
    ///</summary>
    constructor(position, height, width)
    {
        this.position = position
        this.height = height
        this.width = width
    }

    get position()
    {
        return this.position
    }

    set position(position)
    {
        this.position = position
    }

    get height()
    {
        return this.height
    }

    set height(height)
    {
        this.height = height
    }

    get width()
    {
        return this.width
    }

    set width(width)
    {
        this.width = width
    }

    intersectsRect(otherRect)
    {
        //  Axis-Aligned Bounding Box
        if (this.position.x < otherRect.position.x + otherRect.width &&
            this.position.x + this.width > otherRect.position.x &&
            this.position.y < otherRect.position.y + otherRect.height &&
            this.position.y + this.height > otherRect.position.y )
        {
            return true
        }
        return false
    }
}
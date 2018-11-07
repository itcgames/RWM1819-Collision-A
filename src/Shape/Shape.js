class Shape
{
    constructor(position, orientation)
    {
        this.position = position
        this.orientation = orientation
    }

    getCentre()
    {        
        //  https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
        first = this.vertices[0]
        last = this.vertices[this.vertices.length - 1]

        //  Close the shape if not already closed.
        if (first != last)
        {
            this.vertices.push(first)
        }

        twiceArea = 0
        x = 0
        y = 0
        numOfVertices = this.vertices.length
        for(i = 0, j = numOfVertices-1; i < numOfVertices; j = i++)
        {
            p1 = this.vertices[i]
            p2 = this.vertices[j]
            f = (p1.y - first.y) * (p2.x - first.x) - (p2.y - first.y) * (p1.x - first.x)
            twiceArea += f
            x += (p1.x + p2.x - 2 * first.x) * f
            y += (p1.y + p2.y - 2 * first.y) * f
        }
        f = twiceArea * 3
        return new Vector2(x/f + first.x, y/f + first.y)        
    }

    getVertices()
    {
        if (this.vertices === undefined)
        {
            this.vertices = []
            return this.vertices
        }

        return this.vertices
    }

    setVertices(vertices)
    {
        this.vertices = vertices
    }

    addVertex(vertex)
    {
        if (this.vertices.push(vertex))
        {
            return true
        }
        else
        {
            return false
        }
    }

    removeVertex(index)
    {
        if (this.vertices.splice(index, 1))
        {
            return true
        }
        else
        {
            return false
        }
    }

    project(axis)
    {
        var min = axis.dotProduct(this.vertices[0])
        var max = min
        for (var i = 1; i < this.vertices.length; i++)
        {
            var p = axis.dotProduct(this.vertices[i])
            if (p < min)
            {
                min = p
            }
            else if (p > max)
            {
                max = p
            }
        }
        
        var proj = []
        proj['min'] = min
        proj['max'] = max
        return proj
    }

    Axes()
    {
        var axes = []
        for(var i = 0; i < this.vertices.length; i++)
        {
            var p1 = this.vertices[i]
            var p2 = this.vertices[i + 1 == this.vertices.length ? 0 : i + 1]
            var edge = p1.subtract(p2)
            var normal = edge.perp()
            axes[i] = normal
        }

        return axes
    }
}
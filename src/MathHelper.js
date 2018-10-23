//  Define a MathHelper namespace.
var MathHelper = {}

(function() {
    this.magnitude = function(vec)
    {
        return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
    }

    this.normalize = function(vec)
    {
        mag = magnitude(vec) 
        normalizedVec.x = vec.x / mag
        normalizedVec.y = vec.y / mag
        return normalizedVec
    }

    this.distance = function(vec1, vec2) 
    {
        return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2))
    };

    this.distanceSquared = function(vec1, vec2)
    {
        return Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)
    }

    this.degreesToRadians = function(angle)
    {
        return angle * (Math.PI / 180)
    }

    this.radiansToDegrees = function(angle)
    {
        return angle * (180 / Math.PI)
    }

}).apply(MathHelper);
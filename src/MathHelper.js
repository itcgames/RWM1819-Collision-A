class MathHelper
{
    static magnitude(vec)
    {
        return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
    }

    static normalize(vec)
    {
        mag = magnitude(vec) 
        normalizedVec.x = vec.x / mag
        normalizedVec.y = vec.y / mag
        return normalizedVec
    }

    static distance(vec1, vec2) 
    {
        return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2))
    };

    static distanceSquared(vec1, vec2)
    {
        return Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)
    }

    static degreesToRadians(angle)
    {
        return angle * (Math.PI / 180)
    }

    static radiansToDegrees(angle)
    {
        return angle * (180 / Math.PI)
    }
}
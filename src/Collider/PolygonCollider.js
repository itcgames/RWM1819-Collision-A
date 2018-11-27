class PolygonCollider extends Collider
{
    /**
     * The default constructor of the class.
     * @param {Vector2[]} vertices 
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(vertices, objectTags = [], ignoreTags = []) {
        super(new Polygon(vertices), objectTags, ignoreTags);  //  Call the parent classes constructor.
    }

    get vertices()
    {
        return this.shape.vertices;
    }
}
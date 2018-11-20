class PolygonCollider extends Collider
{
    /**
     * The default constructor of the class.
     * @param {Polygon} polygon 
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(polygon, objectTags = [], ignoreTags = []) {
        super(polygon, objectTags, ignoreTags);  //  Call the parent classes constructor.
    }
}
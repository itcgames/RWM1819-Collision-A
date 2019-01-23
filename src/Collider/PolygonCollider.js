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

    set position(newPos){
        var differenceVector = [];
        for (var i = 0, j = 1; j < this.vertices.length; i++, j++) {
            differenceVector.push(this.vertices[j].subtract(this.vertices[i]));
        }
        this.shape.position = newPos;
        this.vertices[0] = this.shape.position;
        for (var i = 1; i < this.vertices.length; i++) {
            this.vertices[i] = this.vertices[i - 1].add(differenceVector[i - 1]);
        }
    }

    /**
     * 
     * @param {Float} angle 
     */
    rotate(angle){
        this.shape.rotate(angle);
    }
}
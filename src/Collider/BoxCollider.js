class BoxCollider extends Collider
{
    /**
     * The default constructor for the class.
     * @param {Scalar} position 
     * @param {Scalar} width 
     * @param {Scalar} height 
     * @param {String[]} objectTags 
     * @param {String[]} ignoreTags 
     */
    constructor(position, width, height, objectTags = [], ignoreTags = []) {
        super(new Rectangle(position, width, height), objectTags, ignoreTags);  //  Call the parent classes constructor.
    }

    /**
     * 
     */
    get width() {
        return this.shape.width;
    }

    /**
     * 
     */
    get height() {
        return this.shape.height;
    }

    /**
     * 
     */
    get vertices() {        
        return this.shape.vertices;
    }

    /**
     * 
     */
    get centre() {
        return this.shape.centre;
    }
}
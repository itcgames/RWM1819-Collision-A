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
}
class CircleCollider extends Collider
{
    /**
     * The default constructor of the class.
     * @param {Circle} circle 
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(circle, objectTags = [], ignoreTags = []) {
        super(circle, objectTags, ignoreTags);  //  Call the parent classes constructor.
    }
}
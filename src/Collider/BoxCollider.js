class BoxCollider extends Collider
{
    /**
     * The default constructor of the class.
     * @param {Rectangle} rectangle 
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(rectangle, objectTags = [], ignoreTags = []) {
        super(rectangle, objectTags, ignoreTags);  //  Call the parent classes constructor.
    }
}
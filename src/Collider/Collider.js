class Collider
{
    /**
     * The default constructor of the class.
     * @param {Shape} shape 
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(shape, objectTags, ignoreTags) {
        this.colliding = false;
        this.shape = shape;
        this.objectTags = objectTags;
        this.ignoreTags = ignoreTags;
    }

    /**
     * 
     * @param {String} tag 
     * @return {Boolean}
     */
    containsObjectTag(tag) {
        var containsTag = false;
        var index = this.objectTags.indexOf(tag);
        if (index > -1) {
            containsTag = true;
        }
        return containsTag;
    }    

    /**
     * 
     * @param {String} tag 
     * @return {Boolean}
     */
    containsIgnoreTag(tag) {
        var containsTag = false;
        var index = this.ignoreTags.indexOf(tag);
        if (index > -1) {
            containsTag = true;
        }
        return containsTag;
    } 

    /**
     * 
     */
    get position() {
        return this.shape.position;
    }
}
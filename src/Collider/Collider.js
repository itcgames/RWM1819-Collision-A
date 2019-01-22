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
        this.screenPos = new Vector2(0, 0);
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
     * @param {Scalar} gridWidth 
     * @param {Scalar} gridHeight 
     */
    updateSpatialHash(gridWidth, gridHeight) {
        this.screenPos = new Vector2(Math.floor(this.position.x / gridWidth), Math.floor(this.position.y / gridHeight));
    }

    /**
     * 
     */
    get position() {
        return this.shape.position;
    }

    /**
     * 
     * @param {Vector2} newPos
     */
    set position(newPos){
        this.shape.position = newPos;
    }
}
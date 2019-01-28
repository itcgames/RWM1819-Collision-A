class CircleCollider extends Collider {
  /**
   * The default constructor of the class.
   * @param {Scalar} position 
   * @param {Scalar} radius 
   * @param {String[]} objectTags
   * @param {String[]} ignoreTags
   */
  constructor(position, radius, objectTags = [], ignoreTags = []) {
    super(new Circle(position, radius), objectTags, ignoreTags); //  Call the parent classes constructor.
  }

  /**
   * 
   */
  get radius() {
    return this.shape.radius;
  }
}
class Vector2 {
  /**
   * Default constructor for the class.
   * @param {Scalar} x the x coordinate
   * @param {Scalar} y the y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns the dot product of otherVector and this Vector2 object.
   * @param {Vector2} otherVector 
   * @returns {Scalar}
   */
  dotProduct(otherVector) {
    return (this.x * otherVector.x) + (this.y * otherVector.y);
  }

  /**
   * Returns a new Vector2 that is perpendicular to this Vector2 object.
   * @returns {Vector2}
   */
  perp() {
    return new Vector2(-this.y, this.x);
  }

  /**
   * Adds otherVector to this Vector2 object and returns the resulting Vector2.
   * @param {Vector2} otherVector 
   * @returns {Vector2}
   */
  add(otherVector) {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
  }

  /**
   * Subtracts otherVector from this Vector2 object and returns the resulting Vector2.
   * @param {Vector2} otherVector 
   * @returns {Vector2}
   */
  subtract(otherVector) {
    return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
  }
}
class MathHelper {
  /**
   * Gets the magnitude of the vector.
   * @param {Vector2} vec 
   * @return {Scalar}
   */
  static magnitude(vec) {
    return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y));
  }

  /**
   * Divides the vector by its magnitude to return the unit vector.
   * @param {Vector2} vec
   * @return {Vector2} 
   */
  static normalize(vec) {
    mag = magnitude(vec);
    normalizedVec.x = vec.x / mag;
    normalizedVec.y = vec.y / mag;
    return normalizedVec;
  }

  /**
   * Returns the distance between vec1 and vec2.
   * @param {Vector2} vec1 
   * @param {Vector2} vec2 
   * @return {Scalar}
   */
  static distance(vec1, vec2) {
    return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2));
  };

  /**
   * Returns the squared distance between vec1 and vec2.
   * @param {Vector2} vec1 
   * @param {Vector2} vec2 
   * @return {Scalar}
   */
  static distanceSquared(vec1, vec2) {
    return Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2);
  }

  /**
   * Converts degrees to radians.
   * @param {Scalar} angle 
   * @return {Scalar}
   */
  static degreesToRadians(angle) {
    return angle * (Math.PI / 180);
  }

  /**
   * Converts radians to degrees.
   * @param {Scalar} angle 
   * @return {Scalar}
   */
  static radiansToDegrees(angle) {
    return angle * (180 / Math.PI);
  }
}
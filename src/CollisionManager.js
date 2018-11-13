/*! CollisionComponent v0.1.0 - MIT license */
'use strict';

class CollisionManager
{
  /**
   * Default constructor for the class
   */
  constructor() {
    this.boxColliderArray = [];
    this.circleColliderArray = [];
    this.polygonColliderArray = [];

    this.collisionColour = "Red";
    this.noCollisionColour = "Green";
  }

  /**
   * Checks for collisions between the objects in each respective array.
   */
  update() {
    if (this.boxColliderArray.length > 0) {
      var boxResult = this.checkArray(this.boxColliderArray, CollisionManager.AxisAlignedBoundingBox);
    }

    if (this.circleColliderArray.length > 0) {
      var circleResult = this.checkArray(this.circleColliderArray, CollisionManager.CircleCollision);
    }

    if (this.polygonColliderArray.length > 0) {
      var polygonResult = this.checkArray(this.polygonColliderArray, CollisionManager.SeperatingAxisTheorem);
    }
  }

  /**
   * Renders all colliders for debugging or testing.
   * @param {Context} ctx 
   */
  render(ctx) {
    //  If the boxColliderArray isn't empty.
    if (this.boxColliderArray.length > 0) {
      //  Cycle through each collider.
      this.boxColliderArray.forEach(collider => {
        ctx.beginPath();
        //  Draw the rectangle.
        ctx.rect(collider.shape.position.x, collider.shape.position.y, collider.shape.width, collider.shape.height);
        //  If the collider is colliding make it [[RED]] otherwise it is [[GREEN]]
        if (collider.colliding === true) {
          ctx.fillStyle = this.collisionColour;
        } else {
          ctx.fillStyle = this.noCollisionColour;
        }
        ctx.fill();
      });      
    }
    //  If the circleColliderArray isn't empty.
    if (this.circleColliderArray.length > 0) {
      //  Cycle through each collider.
      this.circleColliderArray.forEach(collider => {
        ctx.beginPath();
        //  Draw the circle.
        ctx.arc(collider.shape.position.x, collider.shape.position.y, collider.shape.radius, 0, 360);
        //  If the collider is colliding make it [[RED]] otherwise it is [[GREEN]]
        if (collider.colliding === true) {
          ctx.fillStyle = this.collisionColour;
        } else {
          ctx.fillStyle = this.noCollisionColour;
        }
        ctx.fill();
      });
    }
    //  If the polygonColliderArray isn't empty.
    if (this.polygonColliderArray.length > 0) {
      //  Cycle through each collider.
      this.polygonColliderArray.forEach(collider => {
        var vertexArray = collider.shape.getVertices();
        ctx.beginPath();
        //  Draw all vertices of the polygon.
        for (var i = 0; i < vertexArray.length; i++) {
          if (i === 0) {
            ctx.moveTo(vertexArray[i].x, vertexArray[i].y);
          } else {
            ctx.lineTo(vertexArray[i].x, vertexArray[i].y);
          }
        }
        //  If the collider is colliding make it [[RED]] otherwise it is [[GREEN]].
        if (collider.colliding === true) {
          ctx.fillStyle = this.collisionColour;
        } else {
          ctx.fillStyle = this.noCollisionColour;
        }
        ctx.fill()
      });
    }
  }

  /**
   * Checks all objects in the inputArray with the inputFunction to see if there is any collisions and records the results.
   * @param {Collider[]} inputArray 
   * @param {Function} inputFunction 
   */
  checkArray(inputArray, inputFunction) {
    /**
     * The result array is set up as follows:
     * 
     *             element1   element2   element3      ...
     *   element1 |    -    |          |          |
     *   element2 |         |     -    |          |
     *   element3 |         |          |     -    |
     *   ...      |         |          |          |     -
     *  
     * The result of the tests are put into the appropriate positions to prevent retesting the same elements against eachother.
     */
    var result = [];
    // Cycle through each element in the array.
    for (var i = 0; i < inputArray.length; i++) {
      result[i] = [];
      // Cycle through each element in the array.
      for (var j = 0; j < inputArray.length; j++) {
        if (result[j] === undefined) {
          result[j] = [];
        }
        if (inputArray[i] !== inputArray[j] && result[i][j] === undefined){
          var testResult = inputFunction(inputArray[i].shape, inputArray[j].shape);
          result[i][j] = testResult;
          result[j][i] = testResult;
          //  If the object has collided.
          if (testResult === true) {
            inputArray[i].colliding = true;
            inputArray[j].colliding = true;
          }
        }
      }
    }
    return result;
  }

  /**
   * Adds a boxCollider to boxColliderArray.
   * @param {BoxCollider} boxCollider 
   */
  addBoxCollider(boxCollider) {
    this.boxColliderArray.push(boxCollider);
  }

  /**
   * Removes a boxCollider from boxColliderArray.
   * @param {BoxCollider} boxCollider 
   */
  removeBoxCollider(boxCollider) {
    var index = this.boxColliderArray.indexOf(boxCollider);
    if (index > -1) {
      this.boxColliderArray.splice(index, 1);
    }
  }

  /**
   * Adds a circleCollider to circleColliderArray
   * @param {CircleCollider} circleCollider 
   */
  addCircleCollider(circleCollider) {
    this.circleColliderArray.push(circleCollider);
  }

  /**
   * Removes a circleCollider from circleColliderArray.
   * @param {CircleCollider} circleCollider 
   */
  removeCircleCollider(circleCollider) {
    var index = this.circleColliderArray.indexOf(circleCollider);
    if (index > -1) {
      this.circleColliderArray.splice(index, 1);
    }
  }

  /**
   * Adds a polygonCollider to polygonColliderArray
   * @param {PolygonCollider} polygonCollider 
   */
  addPolygonCollider(polygonCollider) {
    this.polygonColliderArray.push(polygonCollider)
  }

  /**
   * Removes a polygonCollider from polygonColliderArray.
   * @param {PolygonCollider} polygonCollider 
   */
  removePolygonCollider(polygonCollider) {
    var index = this.polygonColliderArray.indexOf(polygonCollider);
    if (index > -1) {
      this.polygonColliderArray.splice(index, 1);
    }
  }

  /**
   * Checks for a collision between two rectangles by checking for overlap in their positions.
   * @param {Rectangle} rect1 
   * @param {Rectangle} rect2 
   */
  static AxisAlignedBoundingBox(rect1, rect2) {
    if (rect1.position.x <= rect2.position.x + rect2.width &&
      rect1.position.x + rect1.width >= rect2.position.x &&
      rect1.position.y <= rect2.position.y + rect2.height &&
      rect1.position.y + rect1.height >= rect2.position.y ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks for a collision between two circles using the distance between their centres and their radii.
   * @param {Circle} circle1 
   * @param {Circle} circle2 
   */
  static CircleCollision(circle1, circle2)
  {
    var distance = MathHelper.distance(circle1.position, circle2.position);
    if (distance < circle1.radius + circle2.radius) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks for a collision between two convex polygons by projecting them onto an axis and then checking for overlap.
   * @param {Polygon} polygon1 
   * @param {Polygon} polygon2 
   */
  static SeperatingAxisTheorem(polygon1, polygon2)
  {
    //  Get the axes
    var axes1 = polygon1.Axes();
    var axes2 = polygon2.Axes();
    //  Loop over the axes for polygon1
    for (var i = 0; i < axes1.length; i++) {
      var axis = axes1[i];
      //  Project both polygons onto the axis
      var p1 = polygon1.project(axis);
      var p2 = polygon2.project(axis);
      //  Do the projections overlap? if no we can exit
      if (!CollisionManager.Overlaps(p1, p2)) {
        return false;
      }
    }
    //  Loop over the axes for polygon2
    for (var i = 0; i < axes2.length; i++) {
      var axis = axes2[i];
      //  Project both polygons onto the axis
      var p1 = polygon1.project(axis);
      var p2 = polygon2.project(axis);
      //  Do the projections overlap? if no we can exit
      if (!CollisionManager.Overlaps(p1, p2)) {
        return false;
      }
    }
    //  If all axes have overlap then the polygons are colliding
    return true;
  }

  /**
   * Checks if the projections overlap
   * @param {Array} proj1 
   * @param {Array} proj2 
   */
  static Overlaps(proj1, proj2) {
    if (proj1['min'] <= proj2['max'] && proj2['min'] <= proj1['max']) {
      return true;
    }
    return false;
  }
}

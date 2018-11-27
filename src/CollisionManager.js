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
  checkAllColliders() {
    this.checkBoxColliderArray();
    this.checkCircleColliderArray();
    this.checkCircleAndBoxColliderArray();
    this.checkPolygonColliderArray();
  }

  /**
   * @return {Boolean[][]}
   */
  checkBoxColliderArray() {
    var boxResult;
    if (this.boxColliderArray.length > 0) {
      boxResult = this.checkArray(this.boxColliderArray, CollisionManager.AxisAlignedBoundingBox);
    }
    return boxResult;
  }

  /**
   * @return {Boolean[][]}
   */
  checkCircleColliderArray() {
    var circleResult;
    if (this.circleColliderArray.length > 0) {
      var circleResult = this.checkArray(this.circleColliderArray, CollisionManager.CircleCollision);
    }
    return circleResult
  }

  checkCircleAndBoxColliderArray()
  {
    var collisionResult = [];
    if (this.circleColliderArray.length > 0 && this.boxColliderArray.length > 0){
      collisionResult = this.checkArrays(this.boxColliderArray, this.circleColliderArray, CollisionManager.CircleRectangleCollision);
    }
    return collisionResult;
  }

  /**
   * @return {Boolean[][]}
   */
  checkPolygonColliderArray() {
    var polygonResult;
    if (this.polygonColliderArray.length > 0) {
      polygonResult = this.checkArray(this.polygonColliderArray, CollisionManager.SeperatingAxisTheorem);
    }
    return polygonResult;
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
   * @return {Boolean[][]}
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
        //  Check if the current element should be ignored.
        var ignoreObject = false;
        for(var k = 0; k < inputArray[j].objectTags.length; k++) {
          var index = inputArray[i].ignoreTags.indexOf(inputArray[j].objectTags[k]);
          if (index > -1) {
            ignoreObject = true;
            break;
          }
        }

        if (inputArray[i] !== inputArray[j] && result[i][j] === undefined && ignoreObject === false){
          var testResult = inputFunction(inputArray[i], inputArray[j]);
          result[i][j] = testResult;        
        }
      }
    }
    //  Set each elements own colliding boolean to match their status.
    for (var i = 0; i < result.length; i++) {
      var colliding = false;
      for (var j = 0; j < result.length; j++) {
        if (result[i][j] === true) {
          colliding = true;
        }
      }
      inputArray[i].colliding = colliding;      
    }
    return result;
  }



  /**
   * Checks all objects in the inputArray with the inputFunction to see if there is any collisions and records the results.
   * @param {Collider[]} inputArray1
   * @param {Collider[]} inputArray2
   * @param {Function} inputFunction 
   * @return {Boolean[][][]}
   */
  checkArrays(inputArray1, inputArray2, inputFunction) {
    /**
     * The result array is set up as follows:
     *           
     * ['Array1']
     *                     array2.element1  array2.element2  array2.element3    array2....
     *   array1.element1 |                |                |                |
     *   array1.element2 |                |                |                |
     *   array1.element3 |                |                |                |
     *   array1....      |                |                |                |     
     * 
     * 
     * ['Array2']
     *                     array1.element1  array1.element2  array1.element3    array1....
     *   array2.element1 |                |                |                |
     *   array2.element2 |                |                |                |
     *   array2.element3 |                |                |                |
     *   array2....      |                |                |                |     
     *  
     */
    var result = [];
    result['Array1'] = [];
    
    for(var i = 0; i < inputArray1.length; i++){
      result['Array1'][i] = [];
      for(var j = 0; j < inputArray2.length; j++){
        //  Check if the current element should be ignored.
        var ignoreObject = false;
        var whileIndex = 0;
        while (ignoreObject === false && whileIndex < inputArray2[j].objectTags.length)
        {
          var index = inputArray1[i].ignoreTags.indexOf(inputArray2[j].objectTags[whileIndex]);
          if (index > -1) {
            ignoreObject = true;
          }
          whileIndex++;
        }

        if (ignoreObject === false) {
          var testResult = inputFunction(inputArray1[i], inputArray2[j]);
          result['Array1'][i][j] = testResult;
        }
      }
    }

    //  Set each elements own colliding boolean to match their status.
    for (var i = 0; i < result['Array1'].length; i++) {
      var colliding = false;
      for (var j = 0; j < result['Array1'][i].length; j++) {
        if (result['Array1'][i][j] === true) {
          colliding = true;
        }
      }
      inputArray1[i].colliding = colliding;      
    }

    result['Array2'] = [];

    for(var i = 0; i < inputArray2.length; i++){
      result['Array2'][i] = [];
      for(var j = 0; j < inputArray1.length; j++){
        //  Check if the current element should be ignored.
        var ignoreObject = false;
        var whileIndex = 0;
        while (ignoreObject === false && whileIndex < inputArray1[j].objectTags.length)
        {
          var index = inputArray2[i].ignoreTags.indexOf(inputArray1[j].objectTags[whileIndex]);
          if (index > -1) {
            ignoreObject = true;
          }
          whileIndex++;
        }

        if (ignoreObject === false) {
          var testResult = inputFunction(inputArray1[j], inputArray2[i]);
          result['Array2'][i][j] = testResult;
        }
      }
    }

    for (var i = 0; i < result['Array2'].length; i++) {
      var colliding = false;
      for (var j = 0; j < result['Array2'][i].length; j++) {
        if (result['Array2'][i][j] === true) {
          colliding = true;
        }
      }
      inputArray2[i].colliding = colliding;      
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
   * 
   * @param {Collider} colliderIndex the index of the collider in the results array.
   * @param {Boolean[]} collisionResults 
   * @param {Collider[]} checkArray the array that you want to test the collider against.
   * @param {String} tag 
   * @return {Boolean}
   */
  static CollidedWithTag(colliderIndex, collisionResults, checkArray, tag) {    
    var results = [];
    if (colliderIndex > -1) {
      var collidedObjectTags = [];
      for(var i = 0; i < collisionResults[colliderIndex].length; i++) {
        if (collisionResults[colliderIndex][i] === true) {
          collidedObjectTags.push.apply(collidedObjectTags, checkArray[i].objectTags);
        }
      }
      results = CollisionManager.ArrayContainsElement(collidedObjectTags, tag);
    }
    return results;
  }

  /**
   * 
   * @param {Array} array 
   * @param {Element} element 
   * @return {Scalar}
   */
  static IndexOfElement(array, element)
  {
    var index = array.indexOf(element);
    if (index > -1) {
      containsElement = true;
    }
    return index;
  }

  /**
   * 
   * @param {Array} array 
   * @param {Element} element 
   * @return {Boolean}
   */
  static ArrayContainsElement(array, element) {
    var containsElement = false;
    var index = array.indexOf(element);
    if (index > -1) {
      containsElement = true;
    }
    return containsElement;
  }

  /**
   * 
   * @param {BoxCollider} boxCollider 
   * @param {CircleCollider} circleCollider 
   */
  static CircleRectangleCollision(boxCollider, circleCollider)
  {
    var result = false;
    var distX = Math.abs(circleCollider.shape.position.x - (boxCollider.shape.position.x + (boxCollider.shape.width / 2)));
    var distY = Math.abs(circleCollider.shape.position.y - (boxCollider.shape.position.y + (boxCollider.shape.height / 2)));
    var dX = distX - (boxCollider.shape.width / 2);
    var dY = distY - (boxCollider.shape.height / 2);
    if (distX <= (boxCollider.shape.width / 2) + circleCollider.shape.radius && distY <= (boxCollider.shape.height / 2) + circleCollider.shape.radius) {
      result = true;
    } else if ((dX * dX) + (dY * dY) <= (circleCollider.shape.radius * circleCollider.shape.radius)) {
      result = true;
    }
    return result;
  }

  /**
   * Checks for a collision between two rectangles by checking for overlap in their positions.
   * @param {BoxCollider} collider1 
   * @param {BoxCollider} collider2 
   * @return {Boolean}
   */
  static AxisAlignedBoundingBox(collider1, collider2) {
    if (collider1.shape.position.x <= collider2.shape.position.x + collider2.shape.width &&
      collider1.shape.position.x + collider1.shape.width >= collider2.shape.position.x &&
      collider1.shape.position.y <= collider2.shape.position.y + collider2.shape.height &&
      collider1.shape.position.y + collider1.shape.height >= collider2.shape.position.y ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks for a collision between two circles using the distance between their centres and their radii.
   * @param {CircleCollider} collider1 
   * @param {CircleCollider} collider2 
   * @return {Boolean}
   */
  static CircleCollision(collider1, collider2) {
    var distance = MathHelper.distance(collider1.shape.position, collider2.shape.position);
    if (distance < collider1.shape.radius + collider2.shape.radius) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks for a collision between two convex polygons by projecting them onto an axis and then checking for overlap.
   * @param {PolygonCollider} collider1 
   * @param {PolygonCollider} collider2 
   * @return {Boolean}
   */
  static SeperatingAxisTheorem(collider1, collider2) {
    //  Get the axes
    var axes1 = collider1.shape.Axes();
    var axes2 = collider2.shape.Axes();
    //  Loop over the axes for polygon1
    for (var i = 0; i < axes1.length; i++) {
      var axis = axes1[i];
      //  Project both polygons onto the axis
      var p1 = collider1.shape.project(axis);
      var p2 = collider2.shape.project(axis);
      //  Do the projections overlap? if no we can exit
      if (!CollisionManager.Overlaps(p1, p2)) {
        return false;
      }
    }
    //  Loop over the axes for polygon2
    for (var i = 0; i < axes2.length; i++) {
      var axis = axes2[i];
      //  Project both polygons onto the axis
      var p1 = collider1.shape.project(axis);
      var p2 = collider2.shape.project(axis);
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
   * @return {Boolean}
   */
  static Overlaps(proj1, proj2) {
    if (proj1['min'] <= proj2['max'] && proj2['min'] <= proj1['max']) {
      return true;
    }
    return false;
  }
}

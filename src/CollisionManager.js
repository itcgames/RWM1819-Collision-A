/*! CollisionComponent v0.1.0 - MIT license */
'use strict';

class CollisionManager
{
  ///<summary>
  /// Objects default constructor.
  ///</summary>
  constructor()
  {
    this.collisionObjects = []  
  }

  ///<summary>
  /// Adds the object to the collision manager.
  ///</summary>
  ///<param='object'>The object to be added</param>
  addCollisionObject(object)
  {
    this.collisionObjects.push(object)
  }

  ///<summary>
  /// Removes the object at the specified index.
  ///</summary>
  ///<param='index'>The index of the object to be removed</param>
  removeCollisoinObject(index)
  {
    this.collisionObjects.splice(index, 1)
  }
}

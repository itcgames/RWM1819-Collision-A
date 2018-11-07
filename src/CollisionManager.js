/*! CollisionComponent v0.1.0 - MIT license */
'use strict';

class CollisionManager
{
  ///<summary>
  /// Checks for a collision between rect1 and rect2 
  ///</summary>
  ///<param='rect1'></param>
  ///<param='rect2'></param>
  static AxisAlignedBoundingBox(rect1, rect2)
  {
    if (rect1.position.x <= rect2.position.x + rect2.width &&
      rect1.position.x + rect1.width >= rect2.position.x &&
      rect1.position.y <= rect2.position.y + rect2.height &&
      rect1.position.y + rect1.height >= rect2.position.y )
    {
      return true
    }
    else
    {
      return false
    }
  }

  ///<summary>
  /// Checks for a collision between circle1 and circle2
  ///</summary>
  ///<param='circle1'></param>
  ///<param='circle2'></param>
  static CircleCollision(circle1, circle2)
  {
    var distance = MathHelper.distance(circle1.position, circle2.position)
    if (distance < circle1.radius + circle2.radius)
    {
      return true
    }
    else
    {
      return false
    }
  }

  ///<summary>
  /// Checks for a collision between 2 convex shapes.
  ///</summary>
  ///<param='shape1'></param>
  ///<param='shape2'></param>
  static SeperatingAxisTheorem(shape1, shape2)
  {
    if (shape1.isCircle && shape2.isCircle)
    {
      axis =  shape1.getCenter().subtract(shape2.getCenter())

      p1 = shape1.project(axis)
      p2 = shape2.project(axis)

      //  Do the projections overlap? if no we can exit
      if (!CollisionManager.Overlaps(p1, p2))
      {
        return false
      }
    }
    else if (shape1.isCircle && !shape2.isCircle || !shape1.isCircle && shape2.isCircle)
    {

    }
    else
    {
      //  Get the axes
      var axes1 = shape1.Axes()
      var axes2 = shape2.Axes()

      //  Loop over the axes for shape1
      for (var i = 0; i < axes1.length; i++)
      {
        var axis = axes1[i]
        //  Project both shapes onto the axis
        var p1 = shape1.project(axis)
        var p2 = shape2.project(axis)

        //  Do the projections overlap? if no we can exit
        if (!CollisionManager.Overlaps(p1, p2))
        {
          return false
        }
      }

      //  Loop over the axes for shape2
      for (var i = 0; i < axes2.length; i++)
      {
        var axis = axes2[i]
        //  Project both shapes onto the axis
        var p1 = shape1.project(axis)
        var p2 = shape2.project(axis)

        //  Do the projections overlap? if no we can exit
        if (!CollisionManager.Overlaps(p1, p2))
        {
          return false
        }
      }
    }

    //  If all axes have overlap then the shapes are colliding
    return true
  }

  //  Checks if the projections overlap
  static Overlaps(proj1, proj2)
  {
    if (proj1['min'] <= proj2['max'] && proj2['min'] <= proj1['max'])
    {
      return true
    }
    return false
  }
}

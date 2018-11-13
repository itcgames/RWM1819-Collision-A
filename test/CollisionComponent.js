/* global CollisionComponent, describe, it, expect, should */

describe('CollisionManager()', function () {
  'use strict';

  it('AxisAlignedBoundingBox exists', function () {
    expect(CollisionManager.AxisAlignedBoundingBox).to.be.a('function');
  });

  it('CircleCollision exists', function () {
    expect(CollisionManager.CircleCollision).to.be.a('function');
  });

  it('SeperatingAxisTheorem exists', function () {
    expect(CollisionManager.SeperatingAxisTheorem).to.be.a('function');
  });

  it('Test AABB - Collision', function () {
    var shape1 = new Rectangle(new Vector2(0,0), 2, 2)
    var shape2 = new Rectangle(new Vector2(0,0), 2, 2)

    expect(CollisionManager.AxisAlignedBoundingBox(shape1, shape2)).to.equal(true);
  });

  it('Test AABB - No Collision', function () {
    var shape1 = new Rectangle(new Vector2(0,0), 2, 2)
    var shape2 = new Rectangle(new Vector2(5,0), 2, 2)

    expect(CollisionManager.AxisAlignedBoundingBox(shape1, shape2)).to.equal(false);
  });

  it('Test CircleCollision - Collision', function () {
    var shape1 = new Circle(new Vector2(0,0), 2)
    var shape2 = new Circle(new Vector2(0,0), 2)

    expect(CollisionManager.CircleCollision(shape1, shape2)).to.equal(true);
  });

  it('Test CircleCollision - No Collision', function () {
    var shape1 = new Circle(new Vector2(0,0), 2)
    var shape2 = new Circle(new Vector2(5,0), 2)

    expect(CollisionManager.CircleCollision(shape1, shape2)).to.equal(false);
  });

  it('Test SAT - Collision', function () {
    var shape1 = new Shape(new Vector2(0,0), 0)
    var shape2 = new Shape(new Vector2(1,0), 0)

    shape1.setVertices([shape1.position, new Vector2(2, 0), new Vector2(2, -2), new Vector2(0, -2)])
    shape2.setVertices([shape2.position, new Vector2(3, 0), new Vector2(3, -2), new Vector2(1, -2)])

    expect(CollisionManager.SeperatingAxisTheorem(shape1, shape2)).to.equal(true);
  });

  it('Test SAT - No Collision', function () {
    var shape1 = new Shape(new Vector2(0,0), 0)
    var shape2 = new Shape(new Vector2(3,0), 0)

    shape1.setVertices([shape1.position, new Vector2(2, 0), new Vector2(2, -2), new Vector2(0, -2)])
    shape2.setVertices([shape2.position, new Vector2(5, 0), new Vector2(5, -2), new Vector2(3, -2)])

    expect(CollisionManager.SeperatingAxisTheorem(shape1, shape2)).to.equal(false);
  });

});

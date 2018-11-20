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
    var rect1 = new BoxCollider(new Rectangle(new Vector2(0,0), 2, 2));
    var rect2 = new BoxCollider(new Rectangle(new Vector2(0,0), 2, 2));

    expect(CollisionManager.AxisAlignedBoundingBox(rect1, rect2)).to.equal(true);
  });

  it('Test AABB - No Collision', function () {
    var rect1 = new BoxCollider(new Rectangle(new Vector2(0,0), 2, 2));
    var rect2 = new BoxCollider(new Rectangle(new Vector2(5,0), 2, 2));

    expect(CollisionManager.AxisAlignedBoundingBox(rect1, rect2)).to.equal(false);
  });

  it('Test CircleCollision - Collision', function () {
    var circle1 = new CircleCollider(new Circle(new Vector2(0,0), 2));
    var circle2 = new CircleCollider(new Circle(new Vector2(0,0), 2));

    expect(CollisionManager.CircleCollision(circle1, circle2)).to.equal(true);
  });

  it('Test CircleCollision - No Collision', function () {
    var circle1 = new CircleCollider(new Circle(new Vector2(0,0), 2));
    var circle2 = new CircleCollider(new Circle(new Vector2(5,0), 2));

    expect(CollisionManager.CircleCollision(circle1, circle2)).to.equal(false);
  });

  it('Test SAT - Collision', function () {
    var polygon1 = new PolygonCollider(new Polygon([new Vector2(0,0), new Vector2(2, 0), new Vector2(2, -2), new Vector2(0, -2)]));
    var polygon2 = new PolygonCollider(new Polygon([new Vector2(1,0), new Vector2(3, 0), new Vector2(3, -2), new Vector2(1, -2)]));

    expect(CollisionManager.SeperatingAxisTheorem(polygon1, polygon2)).to.equal(true);
  });

  it('Test SAT - No Collision', function () {
    var polygon1 = new PolygonCollider(new Polygon([new Vector2(0,0), new Vector2(2, 0), new Vector2(2, -2), new Vector2(0, -2)]));
    var polygon2 = new PolygonCollider(new Polygon([new Vector2(3,0), new Vector2(5, 0), new Vector2(5, -2), new Vector2(3, -2)]));

    expect(CollisionManager.SeperatingAxisTheorem(polygon1, polygon2)).to.equal(false);
  });

});

import { geometry, Node, Rect, UITransform, Vec3 } from 'cc';

const aabb = new geometry.AABB();
const minVec = new Vec3();
const maxVec = new Vec3();

export function getTransformWorldRect(out: Rect, transform: UITransform): Rect {
  transform.getComputeAABB(aabb);
  aabb.getBoundary(minVec, maxVec);
  Rect.fromMinMax(out, minVec, maxVec);
  return out;
}

export function forward(out: Vec3, node: Node) {
  return Vec3.transformQuat(out, Vec3.FORWARD, node.worldRotation);
}

export function up(out: Vec3, node: Node) {
  return Vec3.transformQuat(out, Vec3.UP, node.worldRotation);
}

export function right(out: Vec3, node: Node) {
  return Vec3.transformQuat(out, Vec3.RIGHT, node.worldRotation);
}
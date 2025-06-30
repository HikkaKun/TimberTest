import { _decorator, Component, Node, Rect, UITransform, Vec2 } from 'cc';
import { BaseCameraManager } from './BaseCameraManager';
import { getTransformWorldRect } from '../../Utils/Misc';
const { ccclass, property } = _decorator;

@ccclass('CameraManager2D')
export class CameraManager2D extends BaseCameraManager {
  protected _visibleRect = new Rect();

  protected onLoad(): void {
    this._updateVisibleRect();
  }

  protected _toggleEvents(func: 'on' | 'off'): void {
    super._toggleEvents(func);
    this.camera.node[func](Node.EventType.TRANSFORM_CHANGED, this.onCameraTransformChanged, this);
  }

  protected _updateVisibleRect() {
    const height = this.camera.orthoHeight * 2;
    const width = height * this.camera.camera.aspect;
    const { x, y } = this.camera.node.worldPosition;
    this._visibleRect.set(x - width * 0.5, y - height * 0.5, width, height);
  }

  public isOnScreen(node: Node): boolean {
    const transform = node.getComponent(UITransform);
    if (transform) {
      getTransformWorldRect(tempRect, transform);
      return this._visibleRect.intersects(tempRect);
    } else {
      return this._visibleRect.contains(node.worldPosition as unknown as Vec2);
    }
  }

  protected onResize() {
    this._updateVisibleRect();
  }

  protected onCameraTransformChanged() {
    this._updateVisibleRect();
  }
}

const tempRect = new Rect();
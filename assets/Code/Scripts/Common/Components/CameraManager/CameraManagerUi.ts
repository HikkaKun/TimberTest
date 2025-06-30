import { _decorator, Component, Node } from 'cc';
import { CameraManager2D } from './CameraManager2D';
const { ccclass, property } = _decorator;

@ccclass('CameraManagerUi')
export class CameraManagerUi extends CameraManager2D {
  protected onResize(): void {
    //canvas will update the camera on resize too so we need to update the rect after this
    this.scheduleOnce(() => this._updateVisibleRect());
  }
}

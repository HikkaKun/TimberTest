import { _decorator, Component, easing, Node, Quat, Vec3 } from 'cc';
import { ViewComponent } from '../ViewComponent';
import { LogEntity } from './LogEntity';
import { AudioManager } from '../../../Common/Components/Audio/AudioManager';
import { gameContainer } from '../../../Common/Globals';
const { ccclass, property } = _decorator;

@ccclass('LogView')
export class LogView extends ViewComponent<LogEntity> {
  @property(Node)
  private logViewNode: Node = null!;

  @property
  private logViewMoveAnimationOffset = new Vec3(0, 10, 0);

  private _startPosition = new Vec3();
  private _startRotation = new Quat();
  private _audioManager!: AudioManager;

  public init(entity: LogEntity): void {
    super.init(entity);

    this._audioManager = gameContainer.resolve(AudioManager);

    this._disposers = [
      mobx.autorun(() => entity.target && this.onChangeTarget()),
      mobx.autorun(() => this.onMoveProgressChange(entity.moveProgress)),
    ]
  }

  protected onChangeTarget() {
    this.node.getWorldPosition(this._startPosition);
    this.node.getWorldRotation(this._startRotation);
  }

  private onMoveProgressChange(progress: number) {
    const entity = this.entity;
    if (!entity.target) return;

    const t = progress;
    entity.target.controller.entity.getNextLogWorldPosition(tempVec);
    Vec3.lerp(tempVec, this._startPosition, tempVec, t);
    Quat.slerp(tempQuat, this._startRotation, entity.target.node.worldRotation, t);
    this.node.setWorldPosition(tempVec);
    this.node.setWorldRotation(tempQuat);

    if (t < 0.5) {
      Vec3.lerp(tempVec, Vec3.ZERO, this.logViewMoveAnimationOffset, easing.sineOut(t * 2));
    } else {
      Vec3.lerp(tempVec, this.logViewMoveAnimationOffset, Vec3.ZERO, easing.sineIn(1 - t * 2));
    }

    if (progress === 1) {
      this._audioManager.play('block');
    }

    this.logViewNode.setPosition(tempVec);
  }
}

const tempQuat = new Quat();
const tempVec = new Vec3();

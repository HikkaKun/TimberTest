import { _decorator, clamp, Component, Node } from 'cc';
import { EntityComponent } from '../EntityComponent';
import { LogController } from './LogController';
import { StackEntity } from '../Stack/StackEntity';
const { ccclass, property } = _decorator;

@ccclass('LogEntity')
export class LogEntity extends EntityComponent<LogController> {
  @property({ min: 0.01 })
  public moveDuration = 0.25;

  private _moveProgress = 0;
  public get moveProgress() {
    return this._moveProgress;
  }
  public set moveProgress(value) {
    this._moveProgress = clamp(value, 0, 1);
  }

  private _target: StackEntity | null = null;
  public get target() {
    return this._target;
  }

  public set target(value) {
    if (value === this.target) return;

    this.moveProgress = 0;
    this._target = value;
  }

  public init() {
    mobx.makeObservable<LogEntity, '_moveProgress' | '_target'>(this, {
      _moveProgress: mobx.observable,
      moveProgress: mobx.computed,
      _target: mobx.observable,
      target: mobx.computed,
    });
  }
}

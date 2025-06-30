import { _decorator, clamp, Component, Node } from 'cc';
import { ViewComponent } from '../ViewComponent';
import { SellPlacementEntity } from './SellPlacementEntity';
const { ccclass, property } = _decorator;

@ccclass('SellPlacementView')
export class SellPlacementView extends ViewComponent<SellPlacementEntity> {
  @property(Node)
  private playerProgressNode: Node = null!;

  public init(entity: SellPlacementEntity): void {
    super.init(entity);

    this._disposers = [
      mobx.autorun(() => this.onPlayerProgressChange(entity.playerProgress))
    ];
  }

  protected onPlayerProgressChange(progress: number) {
    const scale = clamp(progress, 0, this.entity.sellDelay) / this.entity.sellDelay;
    this.playerProgressNode.setScale(1, scale, 1);
  }
}

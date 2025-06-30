import { _decorator, Component, Node, Sprite, Tween, UIOpacity } from 'cc';
import { UiScreen } from './UiScreen';
const { ccclass, property } = _decorator;

@ccclass('LoadingScreen')
export class LoadingScreen extends UiScreen {
    @property(Sprite)
    private progressBar: Sprite = null!;

    protected _getTween(visible: boolean): Tween<UIOpacity> {
        return new Tween(this._opacity)
            .call(() => { if (visible) this.node.active = true })
            .to(this.animationDuration, { opacity: visible ? 255 : 0 })
            .call(() => { if (!visible) this.node.active = false })
    }

    public onProgress = (finished: number, total: number) => {
        this.progressBar.fillRange = finished / total;
    }
}



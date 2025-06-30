import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CustomComponent')
export class CustomComponent extends Component {
    protected onEnable(): any {
        this._toggleEvents('on');
    }

    protected onDisable(): any {
        this._toggleEvents('off');
    }

    protected _toggleEvents(func: 'on' | 'off'): any {

    }

    public firstTick(): any {
        this._isTicked = true;
    }

    private _isTicked = false;
    protected _tickByManager(dt: number) {
        if (!this._isTicked) {
            this.firstTick();
            this._isTicked = true;
        }
        this.tick(dt);
    }

    public tick(dt: number): any {

    }
}



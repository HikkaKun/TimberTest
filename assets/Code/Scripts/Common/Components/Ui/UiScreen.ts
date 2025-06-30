import { _decorator, Component, Node, Tween, UIOpacity } from 'cc';
import { CustomComponent } from '../CustomComponent';
import { promisifyTween } from '../../Utils/Promises';
const { ccclass, property } = _decorator;

@ccclass('UiScreen')
export class UiScreen extends CustomComponent {
    @property
    public id: string = '';

    @property({ min: 0 })
    public animationDuration = 0.1;

    protected _lastVisibility: boolean | null = null;
    protected _opacity!: UIOpacity;
    protected _visibilityTweenPromise?: ReturnType<typeof promisifyTween<UIOpacity>>;

    protected onLoad(): void {
        this._lastVisibility = this.node.active;
        this._opacity = this.getComponent(UIOpacity) || this.addComponent(UIOpacity)!;
    }

    protected onDestroy(): void {
        this._visibilityTweenPromise?.resolve();
    }

    protected _getTween(visible: boolean) {
        return new Tween(this._opacity)
            .to(this.animationDuration, { opacity: visible ? 255 : 0 });
    }

    public setVisibility(visible: boolean): Promise<void> {
        if (this._lastVisibility !== null && visible === this._lastVisibility) return Promise.resolve();
        this._lastVisibility = visible;

        this._visibilityTweenPromise?.resolve();
        this._visibilityTweenPromise = promisifyTween(this._getTween(visible));

        return this._visibilityTweenPromise.promise;
    }
}

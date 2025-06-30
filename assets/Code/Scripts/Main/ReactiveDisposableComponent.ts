import { _decorator, Component, Node } from 'cc';
import { CustomComponent } from '../Common/Components/CustomComponent';
const { ccclass, property } = _decorator;

@ccclass('ReactiveDisposableComponent')
export class ReactiveDisposableComponent extends CustomComponent {
    protected _disposers: mobx.IReactionDisposer[] = [];

    protected onDestroy(): void {
        this._disposers.forEach(dispose => dispose());
    }
}



import { _decorator, Component, EventTouch, Node } from 'cc';
import { CustomComponentUi } from '../../Common/Components/CustomComponentUi';
const { ccclass, property } = _decorator;

@ccclass('Redirect')
export class Redirect extends CustomComponentUi {
    @property
    private url = '';
    
    protected onTouchStart(event: EventTouch) {
        window.location.replace(this.url);
    }
}

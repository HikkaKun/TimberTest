import { _decorator, Component, EventTouch, Node } from 'cc';
import { CustomComponent } from './CustomComponent';
const { ccclass, property } = _decorator;

@ccclass('CustomComponentUi')
export class CustomComponentUi extends CustomComponent {
    protected _toggleEvents(func: 'on' | 'off') {
        this.node[func](Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node[func](Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node[func](Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node[func](Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    protected onTouchStart(event: EventTouch): any {

    }

    protected onTouchMove(event: EventTouch): any {

    }

    protected onTouchEnd(event: EventTouch): any {
        
    }

    protected onTouchCancel(event: EventTouch): any {

    }
}



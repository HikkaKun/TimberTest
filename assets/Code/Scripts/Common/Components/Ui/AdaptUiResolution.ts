import { _decorator, Component, Node, ResolutionPolicy, screen, view } from 'cc';
import { CustomComponent } from '../CustomComponent';
const { ccclass, property } = _decorator;

@ccclass('AdaptUiResolution')
export class AdaptUiResolution extends CustomComponent {
    protected start(): void {
        this.onResize();
    }

    protected _toggleEvents(func: 'on' | 'off') {
        screen[func]('window-resize', this.onResize, this);
    }

    protected onResize() {
        const { width, height } = screen.resolution;

        if (width <= height) {
            view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
        } else {
            view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
        }
    }
}



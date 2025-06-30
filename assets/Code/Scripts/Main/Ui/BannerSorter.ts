import { _decorator, Component, Node } from 'cc';
import { Banner } from './Banner';
const { ccclass, property } = _decorator;

@ccclass('BannerSorter')
export class BannerSorter extends Component {
    public banners: Banner[] = [];

    protected lateUpdate(dt: number): void {
        this.banners.sort((a, b) => a.distance - b.distance);
        
        const length = this.banners.length;
        for (let i = 0; i < length; i++) {
            this.banners[i].node.setSiblingIndex(i);
        }
    }
}



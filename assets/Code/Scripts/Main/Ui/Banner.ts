import { _decorator, Camera, Component, Node, Vec3 } from 'cc';
import { BannerSorter } from './BannerSorter';
const { ccclass, property } = _decorator;

@ccclass('Banner')
export class Banner extends Component {
    @property(Node)
    private banner: Node | null = null;

    public distance = 0;

    private _sorter?: BannerSorter;

    protected onLoad(): void {
        const sorter = this.node.parent!.getComponent(BannerSorter);
        if (!sorter) return;

        sorter.banners.push(this);
        this._sorter = sorter;
    }

    protected onDestroy(): void {
        const sorter = this._sorter;
        if (!sorter) return;

        sorter.banners.splice(sorter.banners.indexOf(this), 1);
    }

    protected onSyncEvents(localUiPos: Vec3, distanceScale: number, customEventData: string) {
        if (!this.banner) return;
        this.distance = distanceScale;
        this.banner.setPosition(localUiPos);
    }
}



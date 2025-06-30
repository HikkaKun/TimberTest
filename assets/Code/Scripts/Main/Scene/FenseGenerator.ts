import { _decorator, CCInteger, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Generator } from './Generator';
const { ccclass, property } = _decorator;

@ccclass('FenceGenerator')
export class FenceGenerator extends Generator {
    @property(Prefab)
    private fencePrefab: Prefab = null!;

    @property
    private offset = new Vec3();

    @property({ min: 1, type: CCInteger })
    private count = 1;

    protected _generate() {
        this._clear();

        if (!this.fencePrefab) return;

        for (let i = 0; i < this.count; i++) {
            const tree = instantiate(this.fencePrefab);
            tree.parent = this.node;
            temp.set(this.offset);
            temp.multiplyScalar(i);
            tree.setPosition(temp);
        }
    }
}

const temp = new Vec3();

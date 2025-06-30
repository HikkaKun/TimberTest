import { _decorator, Component, instantiate, Node, Prefab, Vec2, Vec3 } from 'cc';
import { Generator } from './Generator';
const { ccclass, property } = _decorator;

@ccclass('TreeGenerator')
export class TreeGenerator extends Generator {
    @property(Prefab)
    private treePrefab: Prefab = null!;

    @property
    private offset = new Vec3(1, 0, 1);

    @property
    private count = new Vec2();

    protected _generate() {
        this._clear();

        if (!this.treePrefab) return;

        for (let x = 0; x < this.count.x; x++) {
            for (let y = 0; y < this.count.y; y++) {
                const tree = instantiate(this.treePrefab);
                tree.parent = this.node;
                temp.set(this.offset);
                temp.multiply3f(x, 0, y);
                tree.setPosition(temp);
                tree.setRotationFromEuler(0, Math.random() * 360, 0);
            }
        }
    }
}

const temp = new Vec3();

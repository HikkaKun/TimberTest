import { _decorator, Component, Node, Quat, Tween, Vec3 } from 'cc';
import { ViewComponent } from '../ViewComponent';
import { TreeEntity } from './TreeEntity';
import { AudioManager } from '../../../Common/Components/Audio/AudioManager';
import { gameContainer } from '../../../Common/Globals';
const { ccclass, property } = _decorator;

@ccclass('TreeView')
export class TreeView extends ViewComponent<TreeEntity> {
    @property(Node)
    private treeNode: Node = null!;

    private _yRotation: number = 0;
    private _audioManager!: AudioManager;

    public init(entity: TreeEntity): void {
        this._yRotation = this.node.worldRotation.getEulerAngles(tempVec).y;

        this._audioManager = gameContainer.resolve(AudioManager);

        super.init(entity);
        this._disposers = [
            mobx.reaction(() => entity.isChopped, (isChopped) => this.onChangeTreeChopped(isChopped))
        ];
    }

    private _appearTween?: Tween<Node>;
    protected onChangeTreeChopped(isChopped: boolean) {
        this.treeNode.active = !isChopped;
        if (isChopped) {
            this._audioManager.play('block');
        } else {
            this._audioManager.play('block');
            this.treeNode.setScale(0, 0, 0);
            this._appearTween = new Tween(this.treeNode)
                .to(0.25, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
                .start();
        }
    }

    private _hitTween?: Tween<{ progress: number }>;
    public onHit(fromNode: Node) {
        Vec3
            .subtract(tempVec, this.node.worldPosition, fromNode.worldPosition)
        Vec3.rotateY(tempVec, tempVec, Vec3.ZERO, Math.PI / 2);
        tempVec.normalize();


        Quat.fromEuler(tempQuat1, 0, this._yRotation, 0);
        Quat.rotateAround(tempQuat2, tempQuat1, tempVec, Math.PI / 8);

        const startQuat = tempQuat2.clone();
        const endQuat = tempQuat1.clone();

        this._hitTween?.stop();
        this._hitTween = new Tween({ progress: 0 })
            .to(0.5, { progress: 1 }, {
                easing: 'backOut',
                onUpdate: (target, ratio) => {
                    Quat.slerp(tempQuat1, startQuat, endQuat, target!.progress);
                    this.node.setWorldRotation(tempQuat1);
                },
            })
            .start();
    }
}

const tempVec = new Vec3();
const tempQuat1 = new Quat();
const tempQuat2 = new Quat();

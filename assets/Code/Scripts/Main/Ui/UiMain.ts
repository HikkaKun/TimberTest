import { _decorator, Component, Node, Tween, UITransform, Vec3 } from 'cc';
import { JoyStick } from '../../Common/Ui/JoyStick';
import { SceneInitiable } from '../../Common/Components/SceneInitiable';
import { CameraManager3D } from '../../Common/Components/CameraManager/CameraManager3D';
import { sceneContainer } from '../../Common/Globals';
import { PoolManager } from '../../Common/Components/PoolManager/PoolManager';
import { MoneyEntity } from '../Game/Money/MoneyEntity';
import { controllerManager } from '../Game/EntityManager';
import { MoneyController } from '../Game/Money/MoneyController';
import { PoolObject } from '../../Common/Components/PoolManager/PoolObject';
const { ccclass, property } = _decorator;

@ccclass('UiMain')
export class UiMain extends SceneInitiable {
    @property(JoyStick)
    public readonly joyStick: JoyStick = null!;

    @property(Node)
    private uiNode: Node = null!;

    @property(Node)
    private moneyBar: Node = null!;

    @property(Node)
    public readonly ingameBarsNode: Node = null!;

    private _poolManager!: PoolManager;
    private _cameraManager3D!: CameraManager3D;
    private _money!: MoneyEntity;

    public init() {
        this._poolManager = sceneContainer.resolve(PoolManager);
        this._cameraManager3D = sceneContainer.resolve(CameraManager3D);
        this._money = controllerManager.getControllers().find(c => c instanceof MoneyController)!.entity
    }

    public spawnMoney(worldPosition3D: Vec3, amount: number) {
        const money = this._poolManager.get('ui_money')!;
        money.parent = this.uiNode;

        this._cameraManager3D.camera.convertToUINode(worldPosition3D, this.uiNode, temp);
        // temp.z = 0;

        money.setPosition(temp);
        money.active = true;

        const startPosition = this.uiNode.getComponent(UITransform)!.convertToWorldSpaceAR(temp).clone();
        new Tween({ progress: 0 })
            .to(0.5,{ progress: 1 }, {
                easing: 'sineIn',
                onUpdate: (target) => {
                    Vec3.lerp(temp, startPosition, this.moneyBar.worldPosition, target!.progress);
                    money.setWorldPosition(temp);
                }
            })
            .call(() => {
                money.getComponent(PoolObject)!.returnToPool();
                this._money.count += amount;
            })
            .start();
    }
}

const temp = new Vec3();

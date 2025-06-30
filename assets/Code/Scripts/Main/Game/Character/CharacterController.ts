import { _decorator, Camera, Component, Node, Quat, RigidBody, toDegree, toRadian, Vec3 } from 'cc';
import { ControllerComponent } from '../ControllerComponent';
import { sceneContainer } from '../../../Common/Globals';
import { UiMain } from '../../Ui/UiMain';
import { CharacterEntity } from './CharacterEntity';
import { CharacterView } from './CharacterView';
import { CameraManager3D } from '../../../Common/Components/CameraManager/CameraManager3D';
import { CharacterState } from './CharacterState';
import { TreeEntity } from '../Tree/TreeEntity';
import { controllerManager } from '../EntityManager';
import { JoyStick } from '../../../Common/Ui/JoyStick';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends ControllerComponent<CharacterEntity, CharacterView> {
    @property(RigidBody)
    private rigidBody: RigidBody = null!;

    private _trees!: TreeEntity[];
    private _joyStick!: JoyStick;
    private _cameraNode!: Node;

    public init() {
        if (this.isInit) return;
        super.init();

        this._disposers = [
            mobx.autorun(() => this.onChangeInput(this.entity.input, this.entity.speed), { delay: 0.001 }),
        ]

        this._joyStick = sceneContainer.resolve(UiMain).joyStick;
        this._cameraNode = sceneContainer.resolve(CameraManager3D).camera.node;
        this._trees = controllerManager.getEntities().filter(e => e instanceof TreeEntity);
    }

    public tick(dt: number) {
        this._checkInput();
        this._checksTrees();
        this._checkChop(dt);
    }

    private _checkInput() {
        const entity = this.entity;
        const angle = this._cameraNode.worldRotation.getEulerAngles(temp).y;
        this._joyStick.getInput(temp);
        temp.z = -temp.y;
        temp.y = 0;
        temp.normalize();
        Vec3.rotateY(temp, temp, Vec3.ZERO, toRadian(angle));
        entity.input.set(temp);

        if (entity.isMoving) {
            entity.state = CharacterState.WALK;
        } else if (entity.state !== CharacterState.CHOP) {
            entity.state = CharacterState.IDLE;
        }
    }

    private _checksTrees() {
        const entity = this.entity;

        if (entity.state === CharacterState.CHOP) return;

        let nearestTree: TreeEntity | null = null;
        let nearestDistance = Infinity;
        let distance: number;
        for (const tree of this._trees) {
            distance = Vec3.distance(entity.node.worldPosition, tree.node.worldPosition);
            if (distance > nearestDistance) continue;
            if (tree.isChopped) continue;

            nearestDistance = distance;
            nearestTree = tree;
        }

        entity.targetTree = nearestDistance > entity.maxDistanceToTree ? null : nearestTree;

        if (!entity.targetTree || entity.state !== CharacterState.IDLE) return;

        entity.state = CharacterState.CHOP;
        entity.targetTree.chopper = this.entity;
        this.rigidBody.setLinearVelocity(Vec3.ZERO);
    }

    private _checkChop(dt: number) {
        const entity = this.entity;

        if (entity.state !== CharacterState.CHOP) {
            entity.chopTime = 0;
        }

        entity.chopTime += dt;

        if (entity.chopTime >= entity.maxChopTime) {
            entity.chopTime = 0;
            entity.state = CharacterState.IDLE;
            entity.targetTree!.isChopped = true;
        }
    }

    private onChangeInput(input: Vec3, speed: number) {
        if (this.entity.state === CharacterState.CHOP) return;

        temp
            .set(input)
            .multiplyScalar(speed);
        this.rigidBody.setLinearVelocity(temp);

        if (!this.entity.isMoving) return;

        this.node.setWorldRotationFromEuler(0, toDegree(Math.atan2(input.x, input.z)) + 180, 0);
    }
}

const temp = new Vec3();

import { _decorator, Component, EventTouch, Node, UITransform, Vec3 } from 'cc';
import { CustomComponentUi } from '../Components/CustomComponentUi';
import { ObservableVec3 } from '../Utils/MobX/ObservableVec3';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('JoyStick')
@requireComponent(UITransform)
export class JoyStick extends CustomComponentUi {
    @property(Node)
    private joyStickRootNode: Node = null!;

    @property(Node)
    private stickNode: Node = null!;

    @property({ min: 0 })
    private stickRange = 100;

    private _transform!: UITransform;
    private _stickParentTransform!: UITransform;

    public getInput(out: Vec3) {
        return out.set(this._input);
    }

    private _idleTime = 0;
    public get idleTime() {
        return this._idleTime;
    }

    private _input = new ObservableVec3();

    constructor() {
        super();

        mobx.makeObservable<JoyStick, '_idleTime'>(this, {
            _idleTime: mobx.observable,
            idleTime: mobx.computed,
        });
    }

    protected onLoad(): void {
        this._transform = this.getComponent(UITransform)!;
        this._stickParentTransform = this.stickNode.parent!.getComponent(UITransform)!;
        this._isActive = false;
    }

    private set _isActive(value) {
        this.joyStickRootNode.active = value;
        !value && this._input.set(0, 0, 0);
    }

    private get _isActive() {
        return this.joyStickRootNode.active;
    }

    protected lateUpdate(dt: number): void {
        if (this._isActive) {
            this._idleTime = 0;
        } else {
            this._idleTime += dt;
        }
    }

    private _getTouchPosition(event: EventTouch) {
        const position = event.getUILocation();
        temp.set(position.x, position.y, 0);
        return temp;
    }

    protected onTouchStart(event: EventTouch) {
        if (this._isActive) return;
        this._isActive = true;
        this._getTouchPosition(event);
        this._transform.convertToNodeSpaceAR(temp, temp);
        this.joyStickRootNode.setPosition(temp);
        this.stickNode.setPosition(Vec3.ZERO);
    }

    protected onTouchMove(event: EventTouch) {
        this._getTouchPosition(event);

        this._stickParentTransform.convertToNodeSpaceAR(temp, temp);
        const touchDistance = temp.length();
        temp.normalize();
        const distance = Math.min(touchDistance, this.stickRange);
        temp.multiplyScalar(distance);
        this._input.set(temp);
        this._input.multiplyScalar(1 / this.stickRange);
        this.stickNode.setPosition(temp);
    }

    protected onTouchEnd(event: EventTouch) {
        this._isActive = false;
    }

    protected onTouchCancel(event: EventTouch) {
        this._isActive = false;
    }
}

const temp = new Vec3();
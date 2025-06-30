import { _decorator, Component, Node } from 'cc';
import { EntityComponent } from './EntityComponent';
import { ViewComponent } from './ViewComponent';
import { ReactiveDisposableComponent } from '../ReactiveDisposableComponent';
import { controllerManager } from './EntityManager';
const { ccclass, property } = _decorator;

@ccclass('ControllerComponent')
export class ControllerComponent<E extends EntityComponent<any>, V extends ViewComponent<E>> extends ReactiveDisposableComponent {
    @property(EntityComponent)
    public entity: E = null!;

    @property(ViewComponent)
    public view: V = null!;

    private _isInit = false;
    public get isInit() {
        return this._isInit;
    }

    protected onLoad(): void {
        this.entity ||= this.getComponent(EntityComponent)! as E;
        this.view ||= this.getComponent(ViewComponent)! as V;

        controllerManager.addController(this);
    }

    protected onDestroy(): void {
        super.onDestroy();
        controllerManager.removeController(this);
    }

    public init() {
        if (this._isInit) return;
        this._isInit = true;

        this.entity ||= this.getComponent(EntityComponent)! as E;
        this.view ||= this.getComponent(ViewComponent)! as V;

        this.entity.init(this);
        this.view.init(this.entity);
    }

    protected _tickByManager(dt: number): void {
        super._tickByManager(dt);
        (this.view as any)._tickByManager(dt);
    }
}



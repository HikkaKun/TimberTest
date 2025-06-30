import { _decorator, Component, director, Node } from 'cc';
import { ControllerComponent } from '../ControllerComponent';
import { TreeEntity } from './TreeEntity';
import { TreeView } from './TreeView';
import { sceneContainer } from '../../../Common/Globals';
import { PoolManager } from '../../../Common/Components/PoolManager/PoolManager';
import { LogController } from '../Log/LogController';
const { ccclass, property } = _decorator;

@ccclass('TreeController')
export class TreeController extends ControllerComponent<TreeEntity, TreeView> {
    public init() {
        if (this.isInit) return;
        super.init();

        const poolManager = sceneContainer.resolve(PoolManager);

        this._disposers = [
            mobx.autorun(() => this.entity.isChopped && this.onChopped(poolManager)),
        ];
    }

    public tick(dt: number) {
        const entity = this.entity;
        if (entity.isChopped) {
            entity.regenerationTimer += dt;

            if (entity.regenerationTimer >= entity.regenerationTime) {
                entity.regenerationTimer = 0;
                entity.isChopped = false;
            }
        }
    }

    protected onChopped(poolManager: PoolManager) {
        const log = poolManager.get('log');
        if (!log) throw new Error('Log prefab not found');
        log.parent = director.getScene();
        log.active = true;
        log.setWorldPosition(this.node.worldPosition);
        const logController = log.getComponent(LogController)!;
        logController.init();

        const stackController = this.entity.chopper?.stack?.controller;
        this.entity.chopper = null;
        if (!stackController) return;

        logController.entity.target = stackController.entity;
    }
}

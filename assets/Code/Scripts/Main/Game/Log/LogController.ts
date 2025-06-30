import { _decorator, Component, Node, Vec3 } from 'cc';
import { ControllerComponent } from '../ControllerComponent';
import { LogEntity } from './LogEntity';
import { LogView } from './LogView';
const { ccclass, property } = _decorator;

@ccclass('LogController')
export class LogController extends ControllerComponent<LogEntity, LogView> {
    public tick(dt: number) {
        const entity = this.entity;
        if (!entity.target) return;

        entity.moveProgress += (1 / entity.moveDuration) * dt;

        if (entity.moveProgress < 1) return;

        entity.target.controller.addLog(this.entity);
        entity.target = null;
    }
}

import { _decorator, Component, director, Node, Vec3 } from 'cc';
import { ControllerComponent } from '../ControllerComponent';
import { StackEntity } from './StackEntity';
import { StackView } from './StackView';
import { LogEntity } from '../Log/LogEntity';
import { PoolObject } from '../../../Common/Components/PoolManager/PoolObject';
const { ccclass, property } = _decorator;

@ccclass('StackController')
export class StackController extends ControllerComponent<StackEntity, StackView> {
    public addLog(log: LogEntity): any {
        if (this.entity.stack >= this.entity.maxStack) return log.getComponent(PoolObject)!.returnToPool();

        log.node.setWorldPosition(this.entity.getNextLogWorldPosition(temp));
        log.node.setParent(this.node, true);
        log.node.setRotationFromEuler(Vec3.ZERO);

        this.entity.logs.push(log);
    }

    public getLog(): LogEntity | null {
        const log = this.entity.logs.pop();
        if (!log) return null;
        log.node.setParent(director.getScene(), true);

        return log;
    }
}

const temp = new Vec3();

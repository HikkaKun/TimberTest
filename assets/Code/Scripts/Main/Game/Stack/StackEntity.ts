import { _decorator, CCInteger, Component, Node, Vec3 } from 'cc';
import { EntityComponent } from '../EntityComponent';
import { LogEntity } from '../Log/LogEntity';
import { StackController } from './StackController';
const { ccclass, property } = _decorator;

@ccclass('StackEntity')
export class StackEntity extends EntityComponent<StackController> {
    @property
    private logOffset = new Vec3(0, 0.25, 0);

    @property({ min: 0, type: CCInteger })
    public maxStack = 30;

    public logs: LogEntity[] = [];

    public get stack() {
        return this.logs.length;
    }

    public get isFull() {
        return this.stack >= this.maxStack;
    }

    constructor() {
        super();

        mobx.makeObservable(this, {
            logs: mobx.observable,
            stack: mobx.computed,
            isFull: mobx.computed,
        });
    }

    public getNextLogWorldPosition(out: Vec3) {
        const index = this.node.children.length;
        return out.set(this.logOffset)
            .multiplyScalar(index)
            .add(this.node.worldPosition);
    }
}



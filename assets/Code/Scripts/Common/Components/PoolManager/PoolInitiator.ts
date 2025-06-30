import { _decorator, Component, Node } from 'cc';
import { PoolManager } from './PoolManager';
import { PoolConfig } from './PoolConfig';
import { SceneInitiable } from '../SceneInitiable';
const { ccclass, property } = _decorator;

@ccclass('PoolInitiator')
export class PoolInitiator extends SceneInitiable {
    @property(PoolManager)
    private poolManager: PoolManager = null!;

    @property([PoolConfig])
    private poolConfigs: PoolConfig[] = [];

    public init() {
        this.poolManager.init(this.poolConfigs);
        this.destroy();
    }
}



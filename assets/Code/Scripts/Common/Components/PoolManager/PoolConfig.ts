import { _decorator, CCInteger, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PoolConfig')
export class PoolConfig {
    @property
    public id = '';

    @property(Prefab)
    public prefab: Prefab | null = null;

    @property({ min: 1, type: CCInteger })
    public preCreateCount = 10;
}



import { _decorator, Component, instantiate, Node, Pool, Prefab } from 'cc';
import { PoolConfig } from './PoolConfig';
import { PoolObject } from './PoolObject';
const { ccclass, property } = _decorator;

@ccclass('PoolManager')
export class PoolManager extends Component {
    private _pools = new Map<string, Pool<Node>>();

    protected onDestroy(): void {
        for (const [, pool] of this._pools) {
            pool.destroy();
        }
    }

    public _free(id: string, node: Node) {
        node.active = false;
        node.parent = this.node;
        this._pools.get(id)?.free(node);
    }

    private _createCtor(id: string, prefab: Prefab) {
        return () => {
            const node = instantiate(prefab);
            node.active = false;
            node.parent = this.node;
            const poolObj = node.getComponent(PoolObject) || node.addComponent(PoolObject);
            poolObj.returnToPool = () => this._free(id, node);

            return node;
        }
    }

    public init(configs: PoolConfig[]) {
        const destroyCallback = (n: Node) => {
            n.removeFromParent();
            n.destroy();
        }

        for (const { id, prefab, preCreateCount } of configs) {
            if (!prefab) continue;
            if (this._pools.has(id)) throw new Error(`Duplicate id "${id}" found in pool configs`);

            this._pools.set(id, new Pool(
                this._createCtor(id, prefab),
                preCreateCount,
                destroyCallback
            ));
        }
    }

    public get(id: string) {
        return this._pools.get(id)?.alloc();
    }

    public has(id: string) {
        return this._pools.has(id);
    }
}



import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PoolObject')
export class PoolObject extends Component {
    public returnToPool: () => void = () => { throw new Error('You should set callback first') };
}

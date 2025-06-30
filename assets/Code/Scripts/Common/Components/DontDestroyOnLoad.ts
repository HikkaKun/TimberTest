import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DontDestroyOnLoad')
export class DontDestroyOnLoad extends Component {
    protected onLoad(): void {
        director.addPersistRootNode(this.node);
    }
}



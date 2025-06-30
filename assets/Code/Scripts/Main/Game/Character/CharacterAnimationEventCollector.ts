import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterAnimationEventCollector')
export class CharacterAnimationEventCollector extends Component {
    public onHit: () => any = () => { };
}



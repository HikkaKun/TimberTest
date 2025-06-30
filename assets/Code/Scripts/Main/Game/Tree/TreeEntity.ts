import { _decorator, Component, Node } from 'cc';
import { EntityComponent } from '../EntityComponent';
import { CharacterEntity } from '../Character/CharacterEntity';
import { TreeController } from './TreeController';
const { ccclass, property } = _decorator;

@ccclass('TreeEntity')
export class TreeEntity extends EntityComponent<TreeController> {
    @property({ min: 0 })
    public regenerationTime = 7;

    public isChopped = false;
    public regenerationTimer = 0;
    public chopper: CharacterEntity | null = null;

    constructor() {
        super();
        mobx.makeObservable(this, {
            isChopped: mobx.observable,
            regenerationTimer: mobx.observable,
            chopper: mobx.observable,
        });
    }
}



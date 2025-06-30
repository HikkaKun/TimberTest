import { _decorator, Component, Node } from 'cc';
import { EntityComponent } from '../EntityComponent';
import { ObservableVec3 } from '../../../Common/Utils/MobX/ObservableVec3';
import { CharacterState } from './CharacterState';
import { TreeEntity } from '../Tree/TreeEntity';
import { StackEntity } from '../Stack/StackEntity';
import { CharacterController } from './CharacterController';
const { ccclass, property } = _decorator;

@ccclass('CharacterEntity')
export class CharacterEntity extends EntityComponent<CharacterController> {
    @property
    public isPlayer = false;

    @property({ min: 0.1 })
    public speed = 5;

    @property({ min: 0.001 })
    public maxDistanceToTree = 1;

    @property({ min: 0 })
    public maxChopTime = 2;

    @property(StackEntity)
    public stack: StackEntity = null!;

    public state: CharacterState = CharacterState.IDLE;
    public readonly input = new ObservableVec3();
    public targetTree: TreeEntity | null = null;
    public chopTime = 0;

    public get isMoving() {
        return this.input.lengthSqr() > 0.001;
    }

    constructor() {
        super();
        mobx.makeObservable(this, {
            state: mobx.observable,
            input: mobx.observable,
            targetTree: mobx.observable,
            stack: mobx.observable,
            isMoving: mobx.computed,
        });
    }
}

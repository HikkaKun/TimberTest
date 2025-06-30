import { _decorator, clamp, Component, Node } from 'cc';
import { EntityComponent } from '../EntityComponent';
import { SellPlacementController } from './SellPlacementController';
import { CharacterEntity } from '../Character/CharacterEntity';
import { StackEntity } from '../Stack/StackEntity';
const { ccclass, property } = _decorator;

@ccclass('SellPlacementEntity')
export class SellPlacementEntity extends EntityComponent<SellPlacementController> {
    @property(StackEntity)
    public sellTargetStack: StackEntity = null!;

    @property({ min: 0 })
    public sellDelay = 0.5;

    @property({ min: 0 })
    public logsSellPerFrame = 0.25;

    public characters: CharacterEntity[] = [];
    public timers: number[] = [];
    public sellProgress: number[] = [];

    public playerProgress = 0;

    constructor() {
        super();

        mobx.makeObservable(this, {
            playerProgress: mobx.observable,
        });
    }

    public addCharacter(character: CharacterEntity) {
        this.characters.push(character);
        this.timers.push(0);
        this.sellProgress.push(0);
    }

    public removeCharacter(character: CharacterEntity) {
        const index = this.characters.indexOf(character);

        if (character.isPlayer) this.playerProgress = 0;

        this.characters.splice(index, 1);
        this.timers.splice(index, 1);
        this.sellProgress.splice(index, 1);
    }
}



import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
import { ControllerComponent } from '../ControllerComponent';
import { SellPlacementEntity } from './SellPlacementEntity';
import { SellPlacementView } from './SellPlacementView';
import { CharacterEntity } from '../Character/CharacterEntity';
const { ccclass, property } = _decorator;

@ccclass('SellPlacementController')
export class SellPlacementController extends ControllerComponent<SellPlacementEntity, SellPlacementView> {
    @property(Collider)
    private collider: Collider = null!;

    public tick(dt: number) {
        const { characters, timers, sellProgress, logsSellPerFrame, sellDelay, sellTargetStack } = this.entity;
        const length = characters.length;
        for (let i = 0; i < length; i++) {
            // if (characters[i].isMoving) {
            //     timers[i] = 0;
            //     continue;
            // }

            if (timers[i] < sellDelay) {
                timers[i] += dt;

                if (characters[i].isPlayer) {
                    this.entity.playerProgress = timers[i];
                }
                continue;
            }

            sellProgress[i] += logsSellPerFrame;
            while (sellProgress[i] >= 1) {
                sellProgress[i] -= 1;
                const log = characters[i].stack.controller.getLog();
                if (!log) break;

                log.target = sellTargetStack;
            }
        }
    }

    protected _toggleEvents(func: 'on' | 'off') {
        this.collider[func]('onTriggerEnter', this.onTriggerEnter, this);
        this.collider[func]('onTriggerExit', this.onTriggerExit, this);
    }

    protected onTriggerEnter(event: ITriggerEvent) {
        this.entity.addCharacter(event.otherCollider.getComponent(CharacterEntity)!);
    }

    protected onTriggerExit(event: ITriggerEvent) {
        this.entity.removeCharacter(event.otherCollider.getComponent(CharacterEntity)!);
    }
}

import { _decorator, Component, Node } from 'cc';
import { EntityComponent } from '../EntityComponent';
import { MoneyController } from './MoneyController';
const { ccclass, property } = _decorator;

@ccclass('MoneyEntity')
export class MoneyEntity extends EntityComponent<MoneyController> {
    public count = 0;

    constructor() {
        super();

        mobx.makeObservable(this, {
            count: mobx.observable,
        });
    }
}

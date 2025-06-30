import { _decorator, Component, Label, Node } from 'cc';
import { ViewComponent } from '../ViewComponent';
import { MoneyEntity } from './MoneyEntity';
const { ccclass, property } = _decorator;

@ccclass('MoneyView')
export class MoneyView extends ViewComponent<MoneyEntity> {
    @property(Label)
    private label: Label = null!;
    
    public init(entity: MoneyEntity): void {
        super.init(entity);

        mobx.autorun(() => this.onChangeMoney(entity.count));
    }

    protected onChangeMoney(count: number) {
        this.label.string = count.toString();
    }
}

import { _decorator, Component, Node } from 'cc';
import { ReactiveDisposableComponent } from '../ReactiveDisposableComponent';
import { EntityComponent } from './EntityComponent';
const { ccclass, property } = _decorator;

@ccclass('ViewComponent')
export class ViewComponent<T extends EntityComponent<any>> extends ReactiveDisposableComponent {
    public entity!: T;

    public init(entity: T) {
        this.entity = entity;
    }
}



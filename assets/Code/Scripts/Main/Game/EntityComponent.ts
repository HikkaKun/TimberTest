import { _decorator, Component, Node } from 'cc';
import { CustomComponent } from '../../Common/Components/CustomComponent';
import { ControllerComponent } from './ControllerComponent';
const { ccclass, property } = _decorator;

@ccclass('EntityComponent')
export class EntityComponent<T extends ControllerComponent<any, any>> extends CustomComponent {   
    public controller!: T;

    public init(controller: T): any {
        this.controller = controller;
    }
}



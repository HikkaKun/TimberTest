import { _decorator, Component, Node } from 'cc';
import { ControllerComponent } from '../ControllerComponent';
import { MoneyEntity } from './MoneyEntity';
import { MoneyView } from './MoneyView';
const { ccclass, property } = _decorator;

@ccclass('MoneyController')
export class MoneyController extends ControllerComponent<MoneyEntity, MoneyView> {
    
}



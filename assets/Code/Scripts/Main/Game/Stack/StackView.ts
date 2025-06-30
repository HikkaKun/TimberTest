import { _decorator, Component, Node, Vec3 } from 'cc';
import { ViewComponent } from '../ViewComponent';
import { StackEntity } from './StackEntity';
const { ccclass, property } = _decorator;

@ccclass('StackView')
export class StackView extends ViewComponent<StackEntity> {
    
}

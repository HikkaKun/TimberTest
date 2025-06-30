import { _decorator, Component, Node } from 'cc';
import { StackController } from '../Stack/StackController';
import { LogEntity } from '../Log/LogEntity';
import { UiMain } from '../../Ui/UiMain';
import { sceneContainer } from '../../../Common/Globals';
const { ccclass, property } = _decorator;

@ccclass('SellPlacementStackController')
export class SellPlacementStackController extends StackController {
    private _uiMain!: UiMain;
    
    public init(): void {
        super.init();
        this._uiMain = sceneContainer.resolve(UiMain);
    }

    public addLog(log: LogEntity) {
        super.addLog(log);
        this._uiMain.spawnMoney(this.node.worldPosition, 5);
    }
}



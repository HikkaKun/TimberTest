import { _decorator, Component, Node } from 'cc';
import { UiScreen } from '../../Common/Components/Ui/UiScreen';
import { SceneInitiable } from '../../Common/Components/SceneInitiable';
import { sceneContainer } from '../../Common/Globals';
import { UiMain } from './UiMain';
const { ccclass, property } = _decorator;

@ccclass('UiScreenTutorial')
export class UiScreenTutorialController extends SceneInitiable {
    @property(UiScreen)
    private uiScreen: UiScreen = null!;

    @property({ min: 0 })
    private timeBeforeShow = 5;

    private _disposers: mobx.IReactionDisposer[] = [];

    protected onDestroy(): void {
        this._disposers.forEach(d => d());
    }

    public init() {
        const joyStick = sceneContainer.resolve(UiMain).joyStick;
        this._disposers = [
            mobx.autorun(() => this.onChangeInputIdleTime(joyStick.idleTime))
        ];
    }

    protected onChangeInputIdleTime(idleTime: number) {
        this.uiScreen.setVisibility(idleTime >= this.timeBeforeShow);
    }
}



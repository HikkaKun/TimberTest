import { UiRoot } from '../Common/Components/Ui/UiRoot';
import { _decorator, Component, Node } from 'cc';
import { gameContainer } from '../Common/Globals';
import { loadSceneAsync } from '../Common/Utils/Promises';
import { MainEntryPoint } from '../Main/MainEntryPoint';
import { SceneName } from './SceneName';
import { AudioManager } from '../Common/Components/Audio/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('EntryPoint')
export class EntryPoint extends Component {
    @property(UiRoot)
    private uiRoot: UiRoot = null!;

    @property(AudioManager)
    private audioManager: AudioManager = null!;

    protected start(): void {
        this._init();
    }

    private async _init() {
        this.uiRoot.toggleLoadingScreen(true);

        gameContainer.registerInstance(UiRoot, this.uiRoot);
        gameContainer.registerInstance(AudioManager, this.audioManager);

        const scene = await loadSceneAsync(SceneName.Main, this.uiRoot.loadingScreen.onProgress);
        const mainEntryPoint = scene.getComponentInChildren(MainEntryPoint)!;
        await mainEntryPoint.init();

        this.audioManager.play('music', { loop: true });

        await this.uiRoot.toggleLoadingScreen(false);
    }
}

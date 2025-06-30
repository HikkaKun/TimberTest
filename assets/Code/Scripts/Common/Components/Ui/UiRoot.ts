import { _decorator, Component, director, Node } from 'cc';
import { LoadingScreen } from './LoadingScreen';
import { CameraManagerUi } from '../CameraManager/CameraManagerUi';
const { ccclass, property } = _decorator;

@ccclass('UiRoot')
export class UiRoot extends Component {
    @property(CameraManagerUi)
    public readonly cameraManagerUi: CameraManagerUi = null!;

    @property(Node)
    private uiScene: Node = null!;

    @property(LoadingScreen)
    public readonly loadingScreen: LoadingScreen = null!;

    public toggleLoadingScreen(isOn: boolean) {
        return this.loadingScreen.setVisibility(isOn);
    }

    public attachUiScene(node: Node) {
        this.uiScene.destroyAllChildren();
        this.uiScene.removeAllChildren();

        node.parent = this.uiScene;
    }
}

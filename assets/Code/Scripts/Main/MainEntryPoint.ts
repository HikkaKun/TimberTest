import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { gameContainer, sceneContainer } from '../Common/Globals';
import { UiRoot } from '../Common/Components/Ui/UiRoot'
import { CameraManager3D } from '../Common/Components/CameraManager/CameraManager3D';
import { UiMain } from './Ui/UiMain';
import { controllerManager } from './Game/EntityManager';
import { SceneInitiable } from '../Common/Components/SceneInitiable';
import { PoolManager } from '../Common/Components/PoolManager/PoolManager';
const { ccclass, property } = _decorator;

@ccclass('MainEntryPoint')
export class MainEntryPoint extends Component {
    @property(Prefab)
    private uiMainPrefab: Prefab = null!;

    @property(CameraManager3D)
    private cameraManager: CameraManager3D = null!;

    @property(PoolManager)
    private poolManager: PoolManager = null!;

    private _isInit = false;

    public async init() {
        const uiRoot = gameContainer.resolve(UiRoot);
        const uiMainNode = instantiate(this.uiMainPrefab);
        uiRoot.attachUiScene(uiMainNode);

        const uiMain = uiMainNode.getComponent(UiMain)!;
        sceneContainer.registerInstance(UiMain, uiMain);
        sceneContainer.registerInstance(CameraManager3D, this.cameraManager);
        sceneContainer.registerInstance(PoolManager, this.poolManager);

        const scene = director.getScene()!;
        for (const initable of scene.getComponentsInChildren(SceneInitiable)) {
            initable.init();
        }

        for (const controller of controllerManager.getControllers()) {
            controller.init();
        }

        this._isInit = true;
    }

    protected update(dt: number): void {
        if (!this._isInit) return;
        controllerManager.tick(dt);
    }
}



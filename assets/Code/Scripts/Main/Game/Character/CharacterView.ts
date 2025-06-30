import { _decorator, Component, EventHandler, game, instantiate, Node, Prefab, SkeletalAnimation, toDegree, UICoordinateTracker, Vec3 } from 'cc';
import { CharacterEntity } from './CharacterEntity';
import { ViewComponent } from '../ViewComponent';
import { sceneContainer } from '../../../Common/Globals';
import { CameraManager3D } from '../../../Common/Components/CameraManager/CameraManager3D';
import { CharacterState } from './CharacterState';
import { CharacterAnimationEventCollector } from './CharacterAnimationEventCollector';
import { TreeView } from '../Tree/TreeView';
import { TreeEntity } from '../Tree/TreeEntity';
import { UiMain } from '../../Ui/UiMain';
import { AudioManager } from '../../../Common/Components/Audio/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('CharacterView')
export class CharacterView extends ViewComponent<CharacterEntity> {
  @property(SkeletalAnimation)
  private skeletalAnimation: SkeletalAnimation = null!;

  @property(Node)
  private axeNode: Node = null!;

  @property(CharacterAnimationEventCollector)
  private animationEventCollector: CharacterAnimationEventCollector = null!;

  @property(Node)
  private maxStackBannerPoint3D: Node = null!;

  @property(Prefab)
  private maxStackBannerPrefab: Prefab = null!;

  private _treeView?: TreeView;
  private _cameraManager!: CameraManager3D;
  private _maxStackBanner!: Node;
  private _audioManager!: AudioManager;

  public tick(dt: number): void {
    if (this._cameraManager) {
      Vec3.lerp(temp, this._cameraManager.node.worldPosition, this.node.worldPosition, 6 * dt);
      this._cameraManager.node.setWorldPosition(temp);
    }
  }

  public init(entity: CharacterEntity) {
    super.init(entity);

    this._cameraManager = sceneContainer.resolve(CameraManager3D);
    this._audioManager = sceneContainer.resolve(AudioManager);

    this.animationEventCollector.onHit = () => this.onHit();
    const banner = instantiate(this.maxStackBannerPrefab);
    banner.parent = sceneContainer.resolve(UiMain).ingameBarsNode;
    const tracker = this.maxStackBannerPoint3D.addComponent(UICoordinateTracker);
    tracker.camera = this._cameraManager.camera;
    tracker.target = banner;
    const handler = new EventHandler();
    handler.target = banner;
    handler.component = 'Banner';
    handler.handler = 'onSyncEvents';
    tracker.syncEvents = [handler];

    banner.active = false;
    this._maxStackBanner = banner;

    this._disposers = [
      mobx.autorun(() => this.onChangeState(entity.state)),
      mobx.autorun(() => this.onChangeTargetTree(entity.targetTree)),
      mobx.autorun(() => this.onChangeStack(entity.stack.isFull))
    ];
  }

  private _changeAxeAngle(angle: number) {
    this.axeNode.setRotationFromEuler(-90, 180, angle);
  }

  protected onChangeState(state: CharacterState) {
    switch (state) {
      case CharacterState.IDLE:
        this.skeletalAnimation.crossFade('Lumber_Idle', 0.1);
        this._changeAxeAngle(0);
        break;
      case CharacterState.WALK:
        this.skeletalAnimation.crossFade('Lumber_Walk', 0.1);
        this._changeAxeAngle(0);
        break;
      case CharacterState.CHOP:
        this.skeletalAnimation.crossFade('Lumber_Chop', 0.1);
        this._changeAxeAngle(45);
        this.entity.node.lookAt(this.entity.targetTree!.node.worldPosition, Vec3.UP);
        break;
    }
  }

  protected onChangeTargetTree(entity: TreeEntity | null) {
    if (!entity) return this._treeView = undefined;
    this._treeView = entity.controller.view;
  }

  protected onChangeStack(isFull: boolean) {
    this._maxStackBanner.active = isFull;
  }

  protected onHit() {
    this._audioManager.play('cut');
    this._treeView?.onHit(this.node);
  }
}

const temp = new Vec3();

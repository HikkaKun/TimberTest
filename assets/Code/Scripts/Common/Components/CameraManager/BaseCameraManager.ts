import { _decorator, Camera, Component, Node, randomRange, screen, Tween, TweenCustomEasing } from 'cc';
import { CustomComponent } from '../CustomComponent';
import { promisifyTween } from '../../Utils/Promises';
const { ccclass, property } = _decorator;

type ShakeParams = {
  progress: number;
}

@ccclass('BaseCameraManager')
export class BaseCameraManager extends CustomComponent {
  @property(Camera)
  public readonly camera: Camera = null!;

  protected _shakeTweenPromise?: ReturnType<typeof promisifyTween<ShakeParams>>;

  protected _toggleEvents(func: 'on' | 'off') {
    screen[func]('window-resize', this.onResize, this);
  }

  public shake(duration: number, power: number, easing: TweenCustomEasing = 'linear') {
    this._shakeTweenPromise?.resolve();
    this._shakeTweenPromise = promisifyTween(
      new Tween<ShakeParams>({ progress: 0 })
        .to(duration, { progress: 1 }, {
          easing,
          onUpdate: (target) => {
            const t = 1 - target!.progress;
            const randomX = randomRange(-power, power) * t;
            const randomY = randomRange(-power, power) * t;

            this.camera.node.setPosition(randomX, randomY, this.camera.node.z);
          }
        }),
      {
        beforeResolve: () => this.camera.node.setPosition(0, 0, this.camera.node.z)
      }
    );

    return this._shakeTweenPromise.promise;
  }

  public stopShake() {
    this._shakeTweenPromise?.resolve();
    this._shakeTweenPromise = undefined;
  }

  public isOnScreen(node: Node): boolean {
    throw new Error('Not implemented');
  }

  protected onResize(): any {

  }
}

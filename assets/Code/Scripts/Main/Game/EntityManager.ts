import { PhysicsSystem } from 'cc';
import { EntityComponent } from './EntityComponent';
import { ControllerComponent } from './ControllerComponent';

const FIXED_DT = 1 / 50;

class _ControllerManager {
    private _entities: EntityComponent[] = [];
    private _controllers: ControllerComponent<any, any>[] = [];
    private _accumulator = 0;

    public addController(controller: ControllerComponent<any, any>) {
        this._controllers.push(controller);
        this._entities.push(controller.entity);
    }

    public removeController(controller: ControllerComponent<any, any>) {
        const index = this._controllers.indexOf(controller);
        this._controllers.splice(index, 1);
        this._entities.splice(index, 1);
    }

    public getEntities(): EntityComponent[] {
        return this._entities.slice();
    }

    public getControllers(): ControllerComponent<any, any>[] {
        return this._controllers.slice();
    }

    public tick(dt: number) {
        let t = 0;
        this._accumulator += dt;

        const world = PhysicsSystem.instance.physicsWorld;
        if (this._accumulator < FIXED_DT) {
            return world.syncSceneToPhysics();
        }

        while (this._accumulator >= FIXED_DT) {
            const length = this._controllers.length;
            for (let i = 0; i < length; i++) {
                (this._controllers[i] as any)._tickByManager(FIXED_DT);
            }
            t++;
            world.syncSceneToPhysics();
            world.step(FIXED_DT);
            world.emitEvents();
            world.syncAfterEvents();

            this._accumulator -= FIXED_DT;
        }
    }
}

export type ControllerManager = _ControllerManager;

export const controllerManager: ControllerManager = new _ControllerManager();
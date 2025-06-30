import { _decorator, Component, Node } from 'cc';
import { SceneInitiable } from '../../Common/Components/SceneInitiable';
const { ccclass, property } = _decorator;

@ccclass('Generator')
export class Generator extends SceneInitiable {
    @property
    protected _preview = false;

    @property
    public set preview(value) {
        this._preview = value;

        value ? this._generate() : this._clear();
    }

    public get preview() {
        return this._preview;
    }

    public init() {
        this._generate();
    }

    protected _generate(): any { }

    protected _clear(): any {
        this.node.destroyAllChildren();
        this.node.removeAllChildren();
    }

    public onLostFocusInEditor() {
        if (this.preview) console.warn(`Don't forget to disable preview in ${this.node.getPathInHierarchy()} before saving scene`);
    }
}



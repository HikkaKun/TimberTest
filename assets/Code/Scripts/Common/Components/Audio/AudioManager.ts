import { _decorator, Component, Node } from 'cc';
import { AudioLibrary } from './AudioLibrary';
import { TaggedAudioSource } from './TaggedAudioSource';
const { ccclass, property } = _decorator;

export type PlayOptions = {
    tags?: string | string[];
    loop?: boolean;
    volume?: number;
}

@ccclass('AudioManager')
export class AudioManager extends Component {
    private static _instances = new Map<string, AudioManager>();

    public static getInstanceById(id: string) {
        return this._instances.get(id);
    }

    @property
    public id = ''; //general id like sfx, music, etc.

    @property(AudioLibrary)
    public audioLibrary: AudioLibrary = null!;

    protected _isMuted = false;
    public set isMuted(value) {
        this._isMuted = value;
        for (const source of this._sources) {
            source.isMuted = this.isMuted;
        }
    }

    public get isMuted() {
        return this._isMuted;
    }

    private _sources: TaggedAudioSource[] = [];
    private _sourceDestroyCallback = (source: TaggedAudioSource) => {
        this._sources.splice(this._sources.indexOf(source), 1);
    }

    protected onLoad(): void {
        if (!this.audioLibrary) throw new Error(`No audio library set for AudioManager with ID "${this.id}"`);
        if (AudioManager._instances.has(this.id)) throw new Error(`AudioManager with ID "${this.id}" exists already`);
        AudioManager._instances.set(this.id, this);
    }

    public getSources() {
        return this._sources.slice();
    }

    public getSourcesByKey(key: string): TaggedAudioSource[] {
        const clip = this.audioLibrary.getClip(key);
        if (!clip) return [];

        return this._sources.filter(s => s.clip === clip);
    }

    public play(key: string, options?: PlayOptions): TaggedAudioSource | undefined {
        const clip = this.audioLibrary.getClip(key);
        if (!clip) return;

        const node = new Node(key);
        node.parent = this.node;

        const source = node.addComponent(TaggedAudioSource);
        source.clip = clip;
        source.isMuted = this.isMuted;
        source.destroyCallback = this._sourceDestroyCallback;

        if (options?.tags !== undefined && !Array.isArray(options.tags)) {
            options.tags = [options.tags];
        }

        Object.assign(source, options);

        source.play();

        return source;
    }
}



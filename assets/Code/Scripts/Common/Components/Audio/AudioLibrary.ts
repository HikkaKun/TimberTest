import { _decorator, AudioClip, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioLibraryConfig')
class AudioLibraryConfig {
    @property
    public readonly key: string = '';

    @property(AudioClip)
    public readonly clip: AudioClip | null = null;
}

@ccclass('AudioLibrary')
export class AudioLibrary extends Component {
    @property([AudioLibraryConfig])
    private configs: AudioLibraryConfig[] = [];

    private _map = new Map<string, AudioClip>();

    protected onLoad(): void {
        for (const { key, clip } of this.configs) {
            clip && this._map.set(key, clip);
        }
    }

    public getClip(key: string): AudioClip | undefined {
        return this._map.get(key);
    }
}



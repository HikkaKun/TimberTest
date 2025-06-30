import { _decorator, AudioSource, CCString, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TaggedAudioSource')
export class TaggedAudioSource extends AudioSource {
    @property({ override: true, range: [0, 1], tooltip: 'i18n:audio.volume' })
    public set volume(value: number) {
        super.volume = value;
        this._updateVolume();
    }

    public get volume() {
        return this._volume;
    }

    @property([CCString])
    public tags: string[] = [];

    protected _isMuted = false;
    public set isMuted(value) {
        this._isMuted = value;
    }

    public get isMuted() {
        return this._isMuted;
    }

    public destroyCallback: (source: TaggedAudioSource) => any = () => { };

    public onEnable(): void {
        super.onEnable();
        this._toggleEvents('on');
    }

    public onDisable() {
        super.onDisable();
        this._toggleEvents('off');
    }

    public onDestroy(): void {
        this.destroyCallback(this);
    }

    protected _updateVolume() {
        if (!this._player) return;

        this._player.volume = this.isMuted ? 0 : this.volume;  
    }

    protected _toggleEvents(func: 'on' | 'off') {
        this.node[func](AudioSource.EventType.ENDED, this.onEnded, this);
    }

    protected onEnded() {
        if (this.loop) return;
        this.node.destroy();
    }
}



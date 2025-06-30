import { Asset, AssetManager, director, resources, Scene, Tween } from 'cc';

export function getPromise<T = void>() {
    let resolve!: (value: T) => void;
    let reject!: (reason?: any) => void;
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        promise,
        resolve,
        reject
    };
}

export function wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function loadSceneAsync(sceneName: string, onProgress?: (finished: number, total: number) => any) {
    const { promise, resolve, reject } = getPromise<Scene>();
    director.preloadScene(sceneName, onProgress!, (error) => {
        if (error) return reject(error);
        director.loadScene(sceneName, (error, scene) => error ? reject(error) : resolve(scene!));
    });

    return promise;
}

export type PromisifyTweenOptions = {
    start?: boolean;
    beforeResolve?: () => any;
    beforeReject?: (reason?: any) => any;
}

export function promisifyTween<T extends object>(tween: Tween<T>, options?: PromisifyTweenOptions) {
    const { promise, resolve, reject } = getPromise();

    const _resolve = () => {
        tween.stop();
        options?.beforeResolve?.();
        resolve();
    }

    const _reject = (reason: any) => {
        tween.stop();
        options?.beforeReject?.(reason);
        reject(reason);
    }

    tween.call(_resolve);
    if (options?.start === undefined || options.start) tween.start();

    return {
        tween,
        promise,
        resolve: _resolve,
        reject: _reject,
    };
}

export type ProgressCallback = (finished: number, total: number, item: AssetManager.RequestItem) => any;

export function loadDirAsync<T extends Asset>(dir: string, constructor: { new(): T }, onProgress: ProgressCallback | null = null) {
    const { promise, resolve, reject } = getPromise<T[]>();

    resources.loadDir(dir, constructor, onProgress, (error, data) => {
        if (error) return reject(error);
        resolve(data);
    });

    return promise;
}

type SubMap = Record<symbol | string, any>;

const defaultId = '_default_';

export class Container {
  private _map = new Map<any, SubMap>();
  private _parentContainer?: Container;

  constructor(parentContainer?: Container) {
    this._parentContainer = parentContainer;
  }

  public registerInstance(key: any, instance: any, id = defaultId) {
    const subMap = this._map.get(key);
    if (!subMap) {
      this._map.set(key, { [id]: instance });
      return;
    }

    if (subMap[id]) throw new Error(`Instance with key:"${key}" & id:"${id}" already exist`);

    subMap[id] = instance;
  }

  public resolve<T>(key: { new(): T }, id?: string): T;
  public resolve<T = unknown>(key: any, id?: string): T
  public resolve(key: any, id = defaultId) {
    const subMap = this._map.get(key);

    if (!subMap?.hasOwnProperty(id)) return this._parentContainer?.resolve(key, id) ?? null;

    return subMap[id];
  }

  public clear() {
    this._map.clear();
  }

  public destroy() {
    this._map.clear();
    delete this._parentContainer;
  }
}

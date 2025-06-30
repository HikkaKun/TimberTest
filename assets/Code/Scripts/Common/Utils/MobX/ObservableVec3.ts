import { Vec3 } from 'cc';

export class ObservableVec3 extends Vec3 {
  constructor(other?: Vec3)
  constructor(x?: number, y?: number, z?: number)
  constructor(x?: any, y?: number, z?: number) {
    super(x, y, z);

    mobx.makeAutoObservable(this);
  }
}
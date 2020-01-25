import { Area } from "./area";

export abstract class Model {
  private _anchor: [number, number] = [0.5, 0.5];

  constructor(private _area: Area) {
  }

  get area(): Area {
    return this._area;
  }

  set area(area: Area) {
    this._area = area;
  }

  get anchor(): [number, number] {
    return this._anchor;
  }

  set anchor(anchor: [number, number]) {
    this._anchor = anchor;
  }
}

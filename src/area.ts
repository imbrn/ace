import { Position } from "./position";
import { Size } from "./size";

export class Area {
  constructor(private _position: Position, private _size: Size) {
  }

  get position(): Position {
    return this._position;
  }

  set position(position: Position) {
    this._position = position;
  }

  get center(): Position {
    return new Position(this.x1 + this.size.width / 2, this.y1 + this.size.height / 2);
  }

  get size(): Size {
    return this._size;
  }

  set size(size: Size) {
    this._size = size;
  }

  get x1(): number {
    return this.position.x;
  }

  get y1(): number {
    return this.position.y;
  }

  get x2(): number {
    return this.x1 + this.size.width;
  }

  get y2(): number {
    return this.y1 + this.size.height;
  }
}

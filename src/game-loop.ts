export interface GameLoopProcess {
  processLoop(elapsedTime: number): void;
}

export class GameLoop {
  private _lastProcessTime: number = 0;

  constructor(private _process: GameLoopProcess) {
  }

  start(): void {
    this.loop(0);
  }

  private loop(timestamp: number): void {
    // game loop
    const elapsedTime = timestamp - this._lastProcessTime;
    this._lastProcessTime = timestamp;
    this._process.processLoop(elapsedTime);

    window.requestAnimationFrame((timestamp) => {
      this.loop(timestamp);
    });
  }
}

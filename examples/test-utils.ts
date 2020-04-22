import { Loadable } from "../src/loadable";

export class MockedLoadable implements Loadable {
  private _isLoading: boolean = true;
  private _hasFailedLoading: boolean = false;

  constructor(private delay: number, private fail?: string) {
  }

  load(): void {
    this._isLoading = true;

    setTimeout(() => {
      if (this.fail) {
        this._hasFailedLoading = false;
      } else {
        this._hasFailedLoading = true;
      }
      this._isLoading = false;
    }, this.delay);
  }

  isLoading(): boolean {
    return this._isLoading;
  }

  hasFailedLoading(): boolean {
    return this._hasFailedLoading;
  }
}

export interface Loadable {
  load(): Promise<Loadable>;
}

export function isLoadable(obj: any): obj is Loadable {
  return "load" in obj && typeof obj.load === "function";
}

export class LoadablesLoading {
  private _successfullyLoadedLoadables: Array<Loadable>;
  private _failedLoadingLoadables: Array<[Loadable, Error]>;

  constructor(private _loadingLoadables: Array<Loadable>) {
    this._successfullyLoadedLoadables = [];
    this._failedLoadingLoadables = [];

    this._loadingLoadables.forEach(loadable => {
      loadable.load()
        .then(loaded => this.onSuccessfullyLoadedLoadable(loaded))
        .catch(cause => this.onFailLoadingLoadable(loadable, cause));
    });
  }

  private onSuccessfullyLoadedLoadable(loadable: Loadable): void {
    this._successfullyLoadedLoadables.push(loadable);
  }

  private onFailLoadingLoadable(loadable: Loadable, cause: Error): void {
    this._failedLoadingLoadables.push([loadable, cause]);
  }

  get isLoading(): boolean {
    const totalLoaded = this._successfullyLoadedLoadables.length + this._failedLoadingLoadables.length;
    return totalLoaded < this._loadingLoadables.length;
  }

  get failedLoadingLoadables(): Array<[Loadable, Error]> {
    return this._failedLoadingLoadables;
  }

  get successfullyLoadedLoadables(): Array<Loadable> {
    return this._successfullyLoadedLoadables;
  }
}

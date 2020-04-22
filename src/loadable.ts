export interface Loadable {
  load(): void;
  isLoading(): boolean;
  hasFailedLoading(): boolean;
}

export function isLoadable(obj: any): obj is Loadable {
  return Boolean(
    obj
    && ("load" in obj && typeof obj.load === "function")
    && ("isLoading" in obj && typeof obj.isLoading === "function")
    && ("hasFailedLoading" in obj && typeof obj.hasFailedLoading === "function"),
  );
}

export class LoadablesLoading implements Loadable {
  static finished(): LoadablesLoading {
    return new FinishedLoadablesLoading();
  }

  constructor(private _loadingLoadables: Array<Loadable>) {
  }

  load(): void {
    this._loadingLoadables.forEach(loadable => loadable.load());
  }

  isLoading(): boolean {
    return this._loadingLoadables.some(loadable => loadable.isLoading());
  }

  hasFailedLoading(): boolean {
    return this._loadingLoadables.some(loadable => this.hasFailedLoading());
  }

  get failedLoadingLoadables(): Array<Loadable> {
    return this._loadingLoadables.filter(loadable => this.hasFailedLoading());
  }
}

class FinishedLoadablesLoading extends LoadablesLoading {
  constructor() {
    super([]);
  }
}

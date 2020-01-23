import { Loadable } from "../src/loadable";

export class MockedLoadable implements Loadable {
  constructor(private delay: number, private fail?: string) {
  }

  load(): Promise<MockedLoadable> {
    return new Promise((resolve: CallableFunction, reject: CallableFunction) => {
      setTimeout(() => {
        if (this.fail) {
          reject(this.fail);
        } else {
          resolve(this);
        }
      }, this.delay);
    });
  }
}

export abstract class BaseProfileBuilder<T extends BaseProfile, B extends BaseProfileBuilder<T, B>> {
  protected object: T;
  protected thisPointer: B;

  protected abstract createObject(): T;

  protected abstract getThisPointer(): B;

  constructor() {
      this.object = this.createObject();
      this.thisPointer = this.getThisPointer();
  }

  withName(value: string): B {
      this.object.name = value;
      return this.thisPointer;
  }

  build(): T {
      return this.object;
  }
}

export abstract class BaseProfile {
  name?: string;
}


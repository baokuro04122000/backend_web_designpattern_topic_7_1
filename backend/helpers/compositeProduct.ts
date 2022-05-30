export abstract class Component{
  protected parent: Component | undefined
  public setParent(parent: Component | undefined){
    this.parent = parent
  }
  public getParent(): Component | undefined{
    return this.parent ? this.parent : undefined
  }
  public isComposite(): boolean {
    return false;
  }
  public add(component: Component): void { }
  public remove(component: Component): void {} 
  public abstract operation(): any;
}
export class Leaf extends Component {
  protected value: any
  constructor(value: any){
    super()
    this.value = value
  }
  public operation(): any {
      return this.value;
  }
}
export class Composite extends Component {
  protected children: Component[] = [];
  public add(component: Component): void {
      this.children.push(component);
      component.setParent(component);
  }
  public remove(component: Component): void {
      const componentIndex = this.children.indexOf(component);
      this.children.splice(componentIndex, 1);
      component.setParent(undefined);
  }
  public isComposite(): boolean {
    return true;
  }
  public operation(): any {
      const results = [];
      for (const child of this.children) {
          results.push(child.operation());
      }
      return `Branch(${results.join('+')})`;
  }
}

export function clientCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}


export function clientCode2(component1: Component, component2: Component) {
  // ...

  if (component1.isComposite()) {
      component1.add(component2);
  }
  return `RESULT: ${component1.operation()}\n`;

  // ...
}


import { Filter } from "./Filter";
import { Node } from "./Node";

export class Transform {

  filters: Filter[] = [];

  constructor() {

  }

  // map(mapper: Mapper) { }

  filter(filter: Filter): Transform {
    this.filters.push(filter);
    return this;
  }

  private iterate(value: any) {
    this.iterateInternal(value, null, new Node(value));
  }

  private iterateInternal(val: any, key: string | null, node: Node): void {
    let removeNode = !this.filters.every(filter => filter(val, key, node));
    if (removeNode) {
      node.remove();
      return;
    }
    if (typeof val == 'object') {
      Object.entries(val)
        .forEach(([key, value]) => this.iterateInternal(value, key, new Node(value, key, node)));
    } else if (Array.isArray(val)) {

    } else {

    }
  }

  accept(val: any): any {

  }
}
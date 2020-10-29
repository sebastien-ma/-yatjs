export class Node {
  val: any;
  key?: string;
  parent?: Node;
  path: (string | number)[] = [];

  isDeleted: boolean = false;

  constructor(val: any, key?: string | number, parent?: Node) {
    this.val = val;
    this.key = key?.toString();
    this.parent = parent;

    if (key != undefined && parent != undefined) {
      this.path = this.path.concat(parent.path).concat([key]);
    }
  }

  isObject(): boolean {
    //TODO need to be plain object
    return typeof this.val == 'object';
  }

  isArray(): boolean {
    return Array.isArray(this.val);
  }

  setValue(val: any): void {
    if (this.parent == undefined || this.key == undefined) {
      throw new Error("setValue cannot be call on the root node.");
    } else {
      this.parent.val[this.key] = val;
    }
  }

  /**
   * Removes this node from the value.
   */
  delete() {
    this.isDeleted = true;
    // if (this.parent == null) return;
    // if (this.parent.isObject() && this.key != null) {
    //   delete this.parent.val[this.key];
    // } else if (this.parent.isArray() && this.key != null) {
    //   this.parent.val.splice(Number.parseInt(this.key), 1);
    // }
  }

  deleteIf(predicate: (node: Node) => boolean) {
    if (predicate(this)) {
      this.delete();
    }
  }

  private printValue() {
    if (Array.isArray(this.val)) {
      return `[array(${this.val.length})]`;
    } else {
      return this.val + "";
    }
  }

  toString() {
    let p = this.path.length == 0 ? '<Root>' : this.path.join('/');
    return `Node(${p} => ${this.printValue()})`;
  }
}

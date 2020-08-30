export class Node {
  val: any;
  key: string | null;
  parent: Node | null;
  path: string[] = [];

  constructor(val: any, key?: string, parent?: Node) {
    this.val = val;
    this.key = key || null;
    this.parent = parent || null;
  }

  isObject(): boolean {
    //TODO need to be plain object
    return typeof this.val == 'object';
  }

  isArray(): boolean {
    return Array.isArray(this.val);
  }

  /**
   * Removes this node from the value.
   */
  remove() {
    if (this.parent == null) return;
    if (this.parent.isObject() && this.key != null) {
      delete this.parent.val[this.key];
    } else if (this.parent.isArray() && this.key != null) {
      this.parent.val.splice(Number.parseInt(this.key), 1);
    }
  }

}

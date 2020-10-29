
import { debug } from "debug";
let d = debug("yatjs");

import { Predicate } from "./Predicate";
import { Node } from "./Node";
import { Mapper } from "./Mapper";

export class Transform {

  mappers: Mapper[] = [];

  constructor() {

  }

  /**
   * 
   * @param mapper 
   */
  map(mapper: Mapper, predicate?: Predicate): Transform {
    let func: Mapper = (val, key, node) => {
      if (predicate == undefined || predicate(val, key, node)) {
        mapper(val, key, node);
      }
    };
    this.mappers.push(func);
    return this;
  }

  /**
   * 
   * @param predicate 
   */
  pick(predicate: Predicate): Transform {
    let func: Mapper = (val, key, node) => node.deleteIf(() => !predicate(val, key, node));
    this.mappers.push(func);
    return this;
  }

  omit(predicate: Predicate): Transform {
    let func: Mapper = (val, key, node) => node.deleteIf(() => predicate(val, key, node));
    this.mappers.push(func);
    return this;
  }

  private iterate(val: any) {
    this.iterateInternal(val, null, new Node(val));
    return val;
  }

  private iterateInternal(val: any, key: string | number | null, node: Node): Node {
    d(`Processing ${node}`)
    for (let mapper of this.mappers) {
      mapper(val, key, node);
      if (node.isDeleted) {
        break;
      }
    }
    if (node.isDeleted) {
      d('node deleted')
      return node;
    }
    if (Array.isArray(val)) {
      val.forEach((item, index) => {
        let childNode = this.iterateInternal(item, index, new Node(item, index, node));
        if (childNode.isDeleted) {
          val.splice(index, 1);
          console.log(val);
        }
      });
    }
    else if (typeof val == 'object') {
      for (let key in val) {
        let childNode = this.iterateInternal(val[key], key, new Node(val[key], key, node));
        if (childNode.isDeleted) {
          delete val[key];
        }
      }
    }
    return node;
  }


  apply(val: any): any {
    return this.iterate(val);
  }
}
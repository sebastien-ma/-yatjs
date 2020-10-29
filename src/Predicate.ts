import { Node } from './Node';

export interface Predicate {
  (val: any, key: string | number | null, node: Node): boolean;
}
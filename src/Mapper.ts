import { Node } from './Node';

export interface Mapper {
  (val: any, key: string | number | null, node: Node): void;
}
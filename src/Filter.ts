import { Node } from './Node';

export interface Filter {
  (val: any, key: string | number | null, node: Node): boolean;
}
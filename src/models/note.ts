import { Position } from './position';

export interface Note {
  data: string;
  color: string;
  position: Position;
  height: number;
  width: number;
}
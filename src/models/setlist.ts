import { Song } from './song';

export interface Setlist {
  title: string;
  data: Song[];
  createdBy: string;
  permission: string;
}
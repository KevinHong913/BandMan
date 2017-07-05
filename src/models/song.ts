import { SongSection } from './song-section';

export interface Song {
  id: number;
  title: string;
  artist: string;
  tempo: number;
  key: string;
  currentKey: string;
  sections: SongSection[];
  youtube: string;
  createdAt: string;
  updatedAt: string;
  fontSize: number;
}
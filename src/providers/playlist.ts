import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Song } from '../models/song';

@Injectable()
export class PlaylistService {

  private playlist: Song[];

  constructor(public storage: Storage) {
    storage.get('playlist').then((response) => {
      if(response) {
        this.playlist = response;
      } else {
        this.playlist = [];
        storage.set('playlist', this.playlist);
      }
    })
  }

  public getPlaylist(): Song[] {
    return this.playlist;
  }

  //continous get list, subscribe?

  public addSong(song: Song): Song[] {
    if(song.id) {
      if( this.playlist.find((obj) => { return obj.id === song.id; }) === undefined ) {
        this.playlist.push(song);
        this.storage.set('playlist', this.playlist);
        console.log('[Playlist]: '+ song.title + ' added');
      }
    } else {
      console.error('[Playlist] Error: no id for the input song.');
    }

    return this.playlist;
  }

  public editSong(song: Song): Song[] {
    if(song.id) {
      this.playlist.forEach( (obj, index) => {
        if(obj.id === song.id) {
          this.playlist.splice(index, 1, song);
          this.storage.set('playlist', this.playlist);
          console.log('[Playlist]: '+ song.title + ' updated', this.playlist);
        }

      })
    }
    return this.playlist;
  }

  public removeSong(index: number) {
    this.playlist.splice(index, 1);
    this.storage.set('playlist', this.playlist);
    console.log('[Playlist]: index ' + index + ' removed');
    return this.playlist;
  }

  public reorderSongs(indexes: any) {
    let element = this.playlist[indexes.from];
    this.playlist.splice(indexes.from, 1);
    this.playlist.splice(indexes.to, 0, element);
  }

  public clearAll(): Promise<any> {
    this.playlist = [];
    this.storage.set('playlist', this.playlist);
    return Promise.resolve(this.playlist);
  }

}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Song } from '../models/song';

@Injectable()
export class SetlistService {

  private setlist: Song[];

  constructor(public storage: Storage) {
    storage.get('setlist').then((response) => {
      if(response) {
        this.setlist = response;
      } else {
        this.setlist = [];
        storage.set('setlist', this.setlist);
      }
    })
  }

  public getSetlist(): Song[] {
    return this.setlist;
  }

  //continous get list, subscribe?

  public addSong(song: Song): Song[] {
    if(song.id) {
      if( this.setlist.find((obj) => { return obj.id === song.id; }) === undefined ) {
        this.setlist.push(song);
        this.storage.set('setlist', this.setlist);
        console.log('[Setlist]: '+ song.title + ' added');
      }
    } else {
      console.error('[Setlist] Error: no id for the input song.');
    }

    return this.setlist;
  }

  public editSong(song: Song): Song[] {
    if(song.id) {
      this.setlist.forEach( (obj, index) => {
        if(obj.id === song.id) {
          this.setlist.splice(index, 1, song);
          this.storage.set('setlist', this.setlist);
          console.log('[Setlist]: '+ song.title + ' updated', this.setlist);
        }

      })
    }
    return this.setlist;
  }

  public removeSong(index: number) {
    this.setlist.splice(index, 1);
    this.storage.set('setlist', this.setlist);
    console.log('[Setlist]: index ' + index + ' removed');
    return this.setlist;
  }

  public reorderSongs(indexes: any) {
    let element = this.setlist[indexes.from];
    this.setlist.splice(indexes.from, 1);
    this.setlist.splice(indexes.to, 0, element);
  }

  public clearAll(): Promise<any> {
    this.setlist = [];
    this.storage.set('setlist', this.setlist);
    return Promise.resolve(this.setlist);
  }

}

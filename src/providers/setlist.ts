import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Song } from '../models/song';
// import { Setlist } from '../models/setlist';
import { BackandService } from '@backand/angular2-sdk';


@Injectable()
export class SetlistService {

  private setlists: any[];

  constructor(public storage: Storage, public http: Http, private backandService: BackandService) {
    storage.get('setlists').then((response) => {
      if(response) {
        this.setlists = response;
      } else {
        this.setlists = [];
        storage.set('setlists', this.setlist);
      }
    })
  }

  public getSetlists(): any {
    return this.setlists;
  }

  /**
   * config: {
   *   includeNote: boolean
   *   
   * }
   */
  public createSetlist(title: string): any {
    let newSetlist = {
      title: title,
      data: [],
      createdBy: 0,
      permission: 'E',
      // isLocal: true
    };

    this.setlists.push(newSetlist);
    this.storage.set('setlists', this.setlists);
  }


  /**
   * Permission:
   * 'E', 'R': edit, read, 'L': local
   */

  /**
   * More page:
   * Show user profile
   * username, full name
   */

  /**
   * Setlist:
   * if local setlist is empty then pull from server
   *
   * share button on setlist page (setlist-popover)
   * (popover: show "share" when not shared, "edit" when shared)
   * When user click share open setlist-edit page
   * show setlist ID, setlist name and permission option
   * with save and cancel on top (updateSetlist)
   * remember to create a copy of config in edit page so wont overwrite the original config..?
   *
   * user pull to refresh
   * Setlist should not include notes (option for notes)
   * After get setlist
   * according to permission, popover will show edit and delete.
   * If user is not setlist author, then just delete from local
   * If user is setlist author, delete from server
   *
   */

  // how to know if setlist is from server or from local? (isLocal)
  // how to know

  public uploadSetlist(setlistData: any): any {
    // set permission (can view, can edit)
    // upload to the server
    // return id
    setlistData.data = JSON.stringify(setlistData.data);
    this.backandService.object.create('setlist', setlistData)
    .then(res => {
      console.log('object updated');
      return res;
    })
    .catch(err => {
      console.log(err);
    });

  }

  // rename
  public renameSetlist(index: number, setlistId: number, newName: string): any {

    let data = {
      title: newName
    };
    this.backandService.object.update('setlist', setlistData.id, data)
    .then(res => {
      console.log('object updated');
      this.setlists[index].data.title = newName;
      this.storage.set('setlists', this.setlists);
      return res;
    })
    .catch(err => {
      console.log(err);
    });

    // set storage
  }

  public getSetlistById(setlistId: any): any {
    // get Setlist from server by id
    this.backandService.object.getOne('setlist', setlistId)
    .then(res => {
      return res;
    })
  }

  /**
   * permission: can view, can edit
   * if can view, then add button is disabled
   * if can edit, then whenever the user add a song it is updated
   */

  public deleteSetlist(index: number) {
    this.setlists.splice(index, 1);
    this.storage.set('setlists', this.setlists);
    console.log('[Setlists]: index ' + index + ' removed');

    // check if its on server
    // also when user trying to refresh, show error message that the playlist no longer exist
    return this.setlists;
  }

  public reorderSetlists(setlistIndexes: any) {
    let element = this.setlists[setlistIndexes.from];
    this.setlists[index].data.splice(setlistIndexes.from, 1);
    this.setlists[index].data.splice(setlistIndexes.to, 0, element);
  }

  // Add song to index setlist, return current setlist
  public addSong(index: number, song: Song): Song[] {
    if(song.id && this.setlists[index]) {
      if( this.setlists[index].data.find((obj) => { return obj.id === song.id; }) === undefined ) {
        this.setlists[index].data.push(song);
        this.storage.set('setlists', this.setlists);
        console.log('[Setlists]: '+ song.title + ' added');
      }
    } else {
      console.error('[Setlist] Error: no id for the input song.');
    }

    return this.setlists[index];
  }

  public editSong(index: number, song: Song): Song[] {
    if(song.id && this.setlists[index]) {
      this.setlists[index].data.forEach( (obj, index) => {
        if(obj.id === song.id) {
          this.setlists[index].data.splice(index, 1, song);
          this.storage.set('setlists', this.setlists);
          console.log('[Setlists]: '+ song.title + ' updated', this.setlists[index]);
        }
      })
    }
    return this.setlist[index];
  }

  public removeSong(index: number, songIndex: number) {
    this.setlists[index].data.splice(songIndex, 1);
    this.storage.set('setlists', this.setlists);
    console.log('[Setlists]: index ' + songIndex + ' removed');
    return this.setlists[index];
  }

  public reorderSongs(index: number, songIndexes: any) {
    let element = this.setlists[index]['data'][songIndexes.from];
    this.setlists[index].data.splice(songIndexes.from, 1);
    this.setlists[index].data.splice(songIndexes.to, 0, element);
  }

  public clearSongList(index: number): Promise<any> {
    this.setlists[index].data = [];
    this.storage.set('setlist', this.setlists);
    return Promise.resolve(this.setlist[index]);
  }

}

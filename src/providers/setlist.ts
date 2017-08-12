import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Song } from '../models/song';
// import { Setlist } from '../models/setlist';
import { BackandService } from '@backand/angular2-sdk';


@Injectable()
export class SetlistService {

  private setlists: any[];
  private userId: any;

  constructor(public storage: Storage, private backandService: BackandService) {
    storage.get('setlists').then((response) => {
      if(response) {
        this.setlists = response;
      } else {
        this.setlists = [];
        storage.set('setlists', this.setlists);
      }
    });

    this.backandService.user.getUserDetails()
    .then((data: any) => {
      if(data.data) {
        this.userId = data.data.userId;
      }
    })
  }

  public getSetlists(): any {
    return this.setlists;
  }

  public getSetlistsName(): any[] {
    return this.setlists.map((setlist) =>  { return setlist.title; });
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
      createdBy: this.userId,
      permission: 'L',
      private: true
    };

    this.setlists.push(newSetlist);
    this.storage.set('setlists', this.setlists);
    return this.setlists;
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

  public uploadSetlist(index: any): Promise<any> {
    // set permission (can view, can edit)
    // upload to the server
    // return id
    let setlistData = this.setlists[index];
    setlistData.data = JSON.stringify(setlistData.data);
    return this.backandService.object.create('setlist', setlistData)
    .then(res => {
      console.log('object updated');
      return res;
    })

  }

  // rename
  public renameSetlist(index: number, setlistId: number, newName: string): Promise<any> {

    let data = {
      title: newName
    };
    return this.backandService.object.update('setlist', this.setlists[index].id, data)
    .then(res => {
      console.log('object updated');
      this.setlists[index].data.title = newName;
      this.storage.set('setlists', this.setlists);
      return res;
    })

    // set storage
  }

  public getSetlistById(setlistId: any): Promise<any> {
    // get Setlist from server by id
    return this.backandService.object.getOne('setlist', setlistId)
  }

  /**
   * permission: can view, can edit
   * if can view, then add button is disabled
   * if can edit, then whenever the user add a song it is updated
   */

  public deleteSetlist(index: number): any {
    this.setlists.splice(index, 1);
    this.storage.set('setlists', this.setlists);
    console.log('[Setlists]: index ' + index + ' removed');

    // check if its on server
    // also when user trying to refresh, show error message that the playlist no longer exist
    return this.setlists;
  }

  public reorderSetlists(setlistIndexes: any) {
    let element = this.setlists[setlistIndexes.from];
    this.setlists.splice(setlistIndexes.from, 1);
    this.setlists.splice(setlistIndexes.to, 0, element);
  }



  /** Setlist Page **/

  public getSetlistByIndex(index: number): any {
    return this.setlists[index];
  }


  // Add song to index setlist, return current setlist
  public addToSetlist(index: number, song: Song): Song[] {
    if(song.id && this.setlists[index]) {
      const songIndex = this.setlists[index].data.findIndex((obj) => { return obj.id === song.id; });
      if(songIndex  === -1) { // song not exist in setlist
        this.setlists[index].data.push(song);
        console.log('[Setlists]: '+ this.setlists[index].title + ': ' + song.title + ' added');
      } else {
        this.setlists[index].data[songIndex] = song;
        console.log('[Setlists]: '+ this.setlists[index].title + ': ' + song.title + ' updated');
      }
      this.storage.set('setlists', this.setlists);
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
    return this.setlists[index];
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
    return Promise.resolve(this.setlists[index]);
  }

}

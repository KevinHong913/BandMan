import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, AlertController } from 'ionic-angular';
import { Song } from '../../models/song';
import { SetlistService } from '../../providers/setlist';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setlist',
  templateUrl: 'setlist.html',
})
export class SetlistPage {
  setlist: Song[];
  listType = 'setlist';
  currentSongIndex = -1;
  filteredList: Song[];
  filter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private setlistService: SetlistService, public events: Events,
              public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SetlistPopover');
    popover.present({
      ev: event
    });
  }

  navToSongDetail(songId: number, listType: string, song: Song, options: any = {}): void {
    let params = {
      songId: songId,
      listType: listType,
      data: song
    };
    this.navCtrl.push('SongDetailsPage', params, options );
  }

  goToSong(song: Song, index: number): void {
    this.currentSongIndex = index;
    this.navToSongDetail(song.id, this.listType, song);
  }

  removeFromSetlist(index: number, slidingItem: ItemSliding): void {
    this.setlist = this.setlistService.removeSong(index);
    slidingItem.close();
  }

  searchSongs(event: any) {
    let filter = event.target.value;
    // if the value is an empty string don't filter the items
    if (filter && filter.trim() !== '') {
      filter = filter.toLowerCase();
      this.filteredList = this.setlist.filter((song) => {
        return !filter || (song.title ? ('' + song.title).toLowerCase().indexOf(filter) !== -1 : false)
         || (song.artist ? ('' + song.artist).toLowerCase().indexOf(filter) !== -1 : false);;
      })
    } else {
      this.filteredList = this.setlist;
    }
  }

  reorderSongs(indexes) {
    this.setlistService.reorderSongs(indexes);
  }

  subSongChangeEvent(): void {
    this.events.subscribe('song:change', (data) => {
      if(data.listType === this.listType && (this.currentSongIndex + data.direction) >= 0 && (this.currentSongIndex + data.direction) <= this.setlist.length - 1) {
        this.currentSongIndex += data.direction;
        const directionStr = data.direction > 0 ? 'forward' : 'back';
        this.navToSongDetail(this.setlist[this.currentSongIndex].id, this.listType, this.setlist[this.currentSongIndex], {direction: directionStr} );
        this.navCtrl.remove(data.viewIndex);
      }
    });
  }

  subClearAllEvent(): void {
    this.events.subscribe('setlist:clearall', (data) => {
      this.setlistService.clearAll()
      .then( res => {
        this.setlist = res;
        this.filteredList = [];
      });
    });
  }

  ionViewWillEnter() {
    this.setlist = this.setlistService.getSetlist();
    this.filteredList = this.setlist;
    console.log('GET setlist', this.setlist);
  }

  ngOnInit() {
    this.subSongChangeEvent();
    this.subClearAllEvent();
  }

}

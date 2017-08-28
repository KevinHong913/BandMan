import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { Song } from '../../models/song';
import { SetlistService } from '../../providers/setlist';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setlist',
  templateUrl: 'setlist.html',
})
export class SetlistPage {
  setlistIndex = -1;
  setlist: any;
  listType = 'setlist';
  currentSongIndex = -1;
  filteredList: Song[];
  filter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private setlistService: SetlistService, public events: Events,
              public popoverCtrl: PopoverController, public alertCtrl: AlertController,
              private modalCtrl: ModalController) {
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SetlistPopover', {
      setlist: this.setlist
    });
    popover.present({
      ev: event
    });
  }

  navToSongDetail(songId: number, listType: string, song: Song, options: any = {}): void {
    let params = {
      songId: songId,
      listType: listType,
      setlistIndex: this.setlistIndex,
      data: song
    };
    this.navCtrl.push('SongDetailsPage', params, options );
  }

  goToSong(song: Song, index: number): void {
    this.currentSongIndex = index;
    this.navToSongDetail(song.id, this.listType, song);
  }

  removeFromSetlist(index: number, slidingItem: ItemSliding): void {
    // this.setlist = this.setlistService.removeSong(index);
    slidingItem.close();
  }

  searchSongs(event: any) {
    let filter = event.target.value;
    // if the value is an empty string don't filter the items
    if (filter && filter.trim() !== '') {
      filter = filter.toLowerCase();
      this.filteredList = this.setlist.data.filter((song) => {
        return !filter || (song.title ? ('' + song.title).toLowerCase().indexOf(filter) !== -1 : false)
         || (song.artist ? ('' + song.artist).toLowerCase().indexOf(filter) !== -1 : false);;
      })
    } else {
      this.filteredList = this.setlist.data;
    }
  }

  reorderSongs(indexes) {
    // this.setlistService.reorderSongs(indexes);
  }

  subSongChangeEvent(): void {
    this.events.unsubscribe('song:change');

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
    this.events.unsubscribe('setlist:clear');
    this.events.subscribe('setlist:clear', (data) => {
      this.setlistService.clearSongList(this.setlistIndex)
      .then( res => {
        this.setlist = res;
        this.filteredList = [];
      });
    });
  }

  subShareEvent(): void {
    this.events.unsubscribe('setlist:share');
    this.events.subscribe('setlist:share', (data) => {

      //open setting modal
      this.modalCtrl.create('SetlistSettingModalComponent', {index: this.setlistIndex, setlist: this.setlist, isInit: true}).present();
      // this.setlistService.uploadSetlist(this.setlistIndex)
      // .then( res => {
      // });
    });
  }

  subOpenSettingEvent(): void {
    this.events.unsubscribe('setlist:setting');
    this.events.subscribe('setlist:setting', (data) => {
      this.modalCtrl.create('SetlistSettingModalComponent', {index: this.setlistIndex, setlist: this.setlist, isInit: false}).present();

    });
  }

  subDeleteEvent(): void {
    this.events.unsubscribe('setlist:delete');
    this.events.subscribe('setlist:delete', (data) => {
      this.setlistService.deleteSetlist(this.setlistIndex)
      .then( res => {

      });
    });
  }

  ionViewWillEnter() {
    this.setlistIndex = this.navParams.get('setlistIndex');
    this.setlist = this.setlistService.getSetlistByIndex(this.setlistIndex);
    this.filteredList = this.setlist.data;
    console.log('GET setlist', this.setlist);
  }

  ngOnInit() {
    this.subSongChangeEvent();
    this.subClearAllEvent();
    this.subShareEvent();
    this.subOpenSettingEvent();
    this.subDeleteEvent();
  }

}

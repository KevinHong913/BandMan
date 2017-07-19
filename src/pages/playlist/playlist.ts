import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, PopoverController, AlertController } from 'ionic-angular';
import { Song } from '../../models/song';
import { PlaylistService } from '../../providers/playlist';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  playlist: Song[];
  listType = 'playlist';
  currentSongIndex = -1;
  filteredList: Song[];
  filter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private playlistService: PlaylistService, public events: Events,
              public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('PlaylistPopover');
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

  removeFromPlaylist(index: number, slidingItem: ItemSliding): void {
    this.playlist = this.playlistService.removeSong(index);
    slidingItem.close();
  }

  searchSongs(event: any) {
    let filter = event.target.value;
    // if the value is an empty string don't filter the items
    if (filter && filter.trim() !== '') {
      filter = filter.toLowerCase();
      this.filteredList = this.playlist.filter((song) => {
        return !filter || (song.title ? ('' + song.title).toLowerCase().indexOf(filter) !== -1 : false)
         || (song.artist ? ('' + song.artist).toLowerCase().indexOf(filter) !== -1 : false);;
      })
    } else {
      this.filteredList = this.playlist;
    }
  }

  reorderSongs(indexes) {
    this.playlistService.reorderSongs(indexes);
  }

  subSongChangeEvent(): void {
    this.events.subscribe('song:change', (data) => {
      if(data.listType === this.listType && (this.currentSongIndex + data.direction) >= 0 && (this.currentSongIndex + data.direction) <= this.playlist.length - 1) {
        this.currentSongIndex += data.direction;
        const directionStr = data.direction > 0 ? 'forward' : 'back';
        this.navToSongDetail(this.playlist[this.currentSongIndex].id, this.listType, this.playlist[this.currentSongIndex], {direction: directionStr} );
        this.navCtrl.remove(data.viewIndex);
      }
    });
  }

  subClearAllEvent(): void {
    this.events.subscribe('playlist:clearall', (data) => {
      this.playlistService.clearAll()
      .then( res => {
        this.alertCtrl
      });
    });
  }

  ionViewWillEnter() {
    this.playlist = this.playlistService.getPlaylist();
    this.filteredList = this.playlist;
    console.log('GET playlist', this.playlist);
  }

  ngOnInit() {
    this.subSongChangeEvent();
    this.subClearAllEvent();
  }

}

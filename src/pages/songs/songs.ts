import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { Song } from '../../models/song';
import { PlaylistService } from '../../providers/playlist';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {
  songList: Song[];
  listType = 'songlist';
  currentSongIndex = -1; // start with -1
  filter: string;
  filteredList: Song[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private backandService: Backand, public playlistService: PlaylistService,
              public events: Events) {
  }

  navToSongDetail(songId: number, listType: string, options: any = {}): void {
    let params = {
      songId: songId,
      listType: listType
    };
    this.navCtrl.push('SongDetailsPage', params, options );
  }

  goToSong(songId: number, index: number): void {
    this.currentSongIndex = index;
    this.navToSongDetail(songId, this.listType);
  }

  addToPlaylist(song: Song, slidingItem: ItemSliding): void {
    this.playlistService.addSong(song);
    slidingItem.close();
  }

  getSongList(): void {
    this.backandService.getSongList()
    .subscribe(response => {
      this.songList = response;
      this.filteredList = response;
    })
  }

  searchSongs(event: any) {
    let filter = event.target.value;
    console.log("FILTER CHANGE", filter);
    // if the value is an empty string don't filter the items
    if (filter && filter.trim() !== '') {
      this.filteredList = this.songList.filter((song) => {
        return !filter || (song.title ? ('' + song.title).toLowerCase().indexOf(filter) !== -1 : false)
         || (song.artist ? ('' + song.artist).toLowerCase().indexOf(filter) !== -1 : false);;
      })
    } else {
      this.filteredList = this.songList;
    }
  }

  songChangeEvent(): void {
    this.events.subscribe('song:change', (data) => {
      if(data.listType === this.listType && (this.currentSongIndex + data.direction) >= 0 && (this.currentSongIndex + data.direction) <= this.songList.length - 1) {
        this.currentSongIndex += data.direction;
        const directionStr = data.direction > 0 ? 'forward' : 'back';
        this.navToSongDetail(this.songList[this.currentSongIndex].id, this.listType, {direction: directionStr} );
        this.navCtrl.remove(data.viewIndex);
      }
    });
  }

  ionViewWillEnter() {
    this.getSongList();
  }

  ngOnInit() {
    this.songChangeEvent();
  }

}

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private playlistService: PlaylistService, public events: Events) {
  }

  navToSongDetail(songId: number, listType: string, currentKey?: string, options: any = {}): void {
    let params = {
      songId: songId,
      listType: listType,
      currentKey: currentKey
    };
    this.navCtrl.push('SongDetailsPage', params, options );
  }

  goToSong(song: Song, index: number): void {
    this.currentSongIndex = index;
    this.navToSongDetail(song.id, this.listType, song.currentKey);
  }

  removeFromPlaylist(index: number, slidingItem: ItemSliding): void {
    this.playlist = this.playlistService.removeSong(index);
    slidingItem.close();
  }

  songChangeEvent(): void {
    this.events.subscribe('song:change', (data) => {
      if(data.listType === this.listType && (this.currentSongIndex + data.direction) >= 0 && (this.currentSongIndex + data.direction) <= this.playlist.length - 1) {
        this.currentSongIndex += data.direction;
        const directionStr = data.direction > 0 ? 'forward' : 'back';
        this.navToSongDetail(this.playlist[this.currentSongIndex].id, this.listType, null, {direction: directionStr} );
        this.navCtrl.remove(data.viewIndex);
      }
    });
  }

  ionViewWillEnter() {
    this.playlist = this.playlistService.getPlaylist();
    console.log('GET playlist', this.playlist);
  }

  ngOnInit() {
    this.songChangeEvent();
  }

}

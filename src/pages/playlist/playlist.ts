import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private playlistService: PlaylistService) {
  }

  goToSong(songId: number): void {
    this.navCtrl.push('SongDetailsPage', {songId: songId});
  }

  removeFromPlaylist(index: number, slidingItem: ItemSliding): void {
    this.playlist = this.playlistService.removeSong(index);
    slidingItem.close();
  }

  ionViewWillEnter() {
    this.playlist = this.playlistService.getPlaylist();
    console.log('GET playlist', this.playlist);
  }

}

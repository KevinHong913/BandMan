import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { Song } from '../../models/song';
import { SongDetailsPage } from '../song-details/song-details';
import { PlaylistService } from '../../providers/playlist';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {
  songList: Song[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private backandService: Backand, public playlistService: PlaylistService) {
  }

  goToSong(songId: number): void {
    this.navCtrl.push('SongDetailsPage', {songId: songId});
  }

  addToPlaylist(song: Song, slidingItem: ItemSliding): void {
    this.playlistService.addSong(song);
    slidingItem.close();
  }

  getSongList(): void {
    this.backandService.getSongList()
    .subscribe(response => {
      this.songList = response;
    })
  }

  ionViewWillEnter() {
    this.getSongList();
  }

}

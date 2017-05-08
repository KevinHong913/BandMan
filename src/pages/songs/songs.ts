import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { Song } from '../../models/song';
import { SongDetailsPage } from '../song-details/song-details'

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage implements OnInit {
  songList: Song[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private backandService: Backand) {
  }

  goToSong(songId: number): void {
    this.navCtrl.push('SongDetailsPage', {songId: songId});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Songs');
  }

  getSongList(): void {
    this.backandService.getSongList()
    .subscribe(response => {
      this.songList = response;
    })
  }

  ngOnInit() {
    this.getSongList();
  }

}

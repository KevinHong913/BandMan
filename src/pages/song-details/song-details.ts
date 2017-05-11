import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { PlaylistService } from '../../providers/playlist';
import { SongDetailsPopover } from '../song-details-popover/song-details-popover';
import { Song } from '../../models/song';

@IonicPage()
@Component({
  selector: 'page-song-details',
  templateUrl: 'song-details.html',
})
export class SongDetailsPage implements OnInit{
  private songId: number;
  song: Song;
  originalKey: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController, public events: Events,
              private backandService: Backand, private playlistService: PlaylistService) {
    this.songId = navParams.get('songId');
    this.backandService.getSongById(this.songId)
    .subscribe( response => {
      this.song = response;
      this.originalKey = response.key;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SongDetailsPopover', {key: this.song.key});
    popover.present({
      ev: event
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // keychange in popover
    this.events.subscribe('song:keyChanged', (newKey) => {
      this.song.key = newKey;
      console.log("KEY EVENT", newKey);
    });

    // add to playlist in popover
    this.events.subscribe('song:addToPlaylist', () => {
      this.playlistService.addSong(this.song);
    });
  }

  ionViewWillUnload() {
    this.events.unsubscribe('song:keyChanged');
    this.events.unsubscribe('song:addToPlaylist');
  }


}

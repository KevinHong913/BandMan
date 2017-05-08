import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { PopoverController } from 'ionic-angular';
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
              private backandService: Backand, public popoverCtrl: PopoverController, public events: Events) {
    this.songId = navParams.get('songId');
    this.backandService.getSongById(this.songId)
    .subscribe( response => {
      this.song = response;
      this.originalKey = response.key;
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(SongDetailsPopover, {key: this.song.key});
    popover.present({
      ev: event
    });
  }

  ngOnInit() {
    this.events.subscribe('song:keyChanged', (newKey) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.song.key = newKey;
      console.log("KEY EVENT", newKey);
    });
  }


}

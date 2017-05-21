import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { PlaylistService } from '../../providers/playlist';
import { Song } from '../../models/song';

@IonicPage()
@Component({
  selector: 'page-song-details',
  templateUrl: 'song-details.html',
})
export class SongDetailsPage implements AfterViewInit {
  private songId: number;
  listType: string;
  song: Song;
  originalKey: string;
  currentKey: string;
  fontSize = 18;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController, public events: Events,
              private backandService: Backand, private playlistService: PlaylistService,
              private viewCtrl: ViewController) {
    this.songId = navParams.get('songId');
    this.listType = navParams.get('listType');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SongDetailsPopover', {key: this.song.currentKey} );
    popover.present({
      ev: event
    });
  }

  ngOnInit() {
    this.backandService.getSongById(this.songId)
    .subscribe( response => {
      this.song = response;
      this.song.currentKey = response.key;
    });
  }

  ngAfterViewInit() {

  }

  changeSong(event): void {
    let direction = 0;
    if(Math.abs(event.deltaX) < 150) { return; }

    if(event.direction === 2) { // swipe right
      direction = 1
    } else if(event.direction === 4) { // swipe left
      direction = -1;
    }

    const eventData = {
      listType: this.listType,
      direction: direction,
      viewIndex: this.viewCtrl.index
    };
    this.events.publish('song:change', eventData );
  }

  ionViewWillEnter() {
    // keychange in popover
    this.events.subscribe('song:keyChanged', (newKey) => {
      this.song.currentKey = newKey;
      console.log("KEY EVENT", newKey);
    });

    // add to playlist in popover
    this.events.subscribe('song:addToPlaylist', () => {
      this.playlistService.addSong(this.song);
    });

    // font size change
    this.events.subscribe('style:fontSizeChange', (changeSize) => {
      if(this.fontSize > 10 && this.fontSize < 24) {
        this.fontSize += changeSize;
      }
    });
  }

  ionViewWillUnload() {
    this.events.unsubscribe('song:keyChanged');
    this.events.unsubscribe('song:addToPlaylist');
    this.events.unsubscribe('style:fontSizeChange');
  }


}

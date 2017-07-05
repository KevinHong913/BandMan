import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Loading, LoadingController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { PlaylistService } from '../../providers/playlist';
import { Song } from '../../models/song';
import { AppConfig } from '../../providers/config';

@IonicPage()
@Component({
  selector: 'page-song-details',
  templateUrl: 'song-details.html',
})
export class SongDetailsPage {
  private songId: number;
  loading: Loading;
  listType: string; // playlist & songlist
  song: Song;
  savedKey: string;
  fontSize: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController, public events: Events,
              private backandService: Backand, private playlistService: PlaylistService,
              private viewCtrl: ViewController, public AppConfig: AppConfig,
              private storage: Storage, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController ) {
    this.songId = navParams.get('songId');
    this.listType = navParams.get('listType');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SongDetailsPopover', {key: this.song.currentKey, isPlaylist: (this.listType === 'playlist') } );
    popover.present({
      ev: event
    });
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

  loadSong() {
    this.storage.get('song:' + this.songId).then(res => {
      if(res) {
        this.song = res;
        this.song.currentKey = res.key;
        this.loading.dismiss();
      } else {
        this.backandService.getSongById(this.songId)
        .then( (response) => {
          this.song = response;
          this.song.currentKey = response.key;
          this.storage.set('song:' + this.songId, response);
          this.loading.dismiss();
        });
      }
    });
  }

  showAlert(message: string) {
    this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ngOnInit() {
    this.showLoading();
    if(this.listType === 'playlist') {
      let songBuffer = this.navParams.get('data');
      if(songBuffer.currentKey) {
        this.song = songBuffer;
        this.savedKey = songBuffer.currentKey;
        this.song.currentKey = songBuffer.key;
        this.loading.dismiss();
      } else {
        this.loadSong();
      }
    } else {
      this.loadSong();
    }
  }

  ngAfterViewInit() {
    if(this.listType === 'playlist' && this.song) {
      this.song.currentKey = this.savedKey;
    }
  }

  ionViewWillEnter() {

    // set default font size
    this.fontSize = (this.listType === 'playlist' && this.song.fontSize) ? this.song.fontSize : this.AppConfig.getFontSize();

    // keychange in popover
    this.events.subscribe('song:keyChanged', (newKey) => {
      this.song.currentKey = newKey;
      console.log("KEY EVENT", newKey);
    });

    // add to playlist in popover
    this.events.subscribe('song:addToPlaylist', () => {
      this.song.fontSize = this.fontSize;
      if(this.listType === 'playlist') {
        this.playlistService.editSong(this.song);
        this.showAlert('Successfully update your playlist');
      } else {
        this.playlistService.addSong(this.song);
        this.showAlert('Successfully add to your playlist');
      }
    });

    // font size change
    this.events.subscribe('style:fontSizeChange', (delta) => {
      let tmpSize = this.fontSize + delta;
      if(tmpSize > 12 && tmpSize < 24) {
        this.fontSize = tmpSize;
      }
    });
  }

  ionViewWillUnload() {
    this.events.unsubscribe('song:keyChanged');
    this.events.unsubscribe('song:addToPlaylist');
    this.events.unsubscribe('style:fontSizeChange');
  }


}

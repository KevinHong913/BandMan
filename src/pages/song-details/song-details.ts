import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Loading, LoadingController, AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { SetlistService } from '../../providers/setlist';
import { Song } from '../../models/song';
import { Note } from '../../models/note';
import { Position } from '../models/position';
import { AppConfig } from '../../providers/config';

import { StickyNoteComponent } from '../../components/sticky-note/sticky-note';

@IonicPage()
@Component({
  selector: 'page-song-details',
  templateUrl: 'song-details.html',
})
export class SongDetailsPage {
  private songId: number;
  loading: Loading;
  listType: string; // setlist & songlist
  song: Song;
  savedKey: string;
  fontSize: number;
  offsetTop: number;
  setlistIndex: number;
  // notes: any = [];
  fabsMetaData: String[] = [
    'Fade In',
    'Fade Out',
    'Repeat',
    'Build',
    'Mute',
    'Extra Messure',
    'Solo'
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController, public events: Events,
              private backandService: Backand, private setlistService: SetlistService,
              private viewCtrl: ViewController, public AppConfig: AppConfig,
              private storage: Storage, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController ) {
    this.songId = navParams.get('songId');
    this.listType = navParams.get('listType');
    this.setlistIndex = navParams.get('setlistIndex');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create('SongDetailsPopover', {
      key: this.song.currentKey,
      isSetlist: (this.listType === 'setlist'),
      setlistIndex: this.setlistIndex
    });
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

  addNewNote(message: string) {
    let newNote: Note = {
      data: message,
      color: 'yellow',
      position: {
        top: (50 * (this.song.notes.length + 1)) % 300,
        left: (100 * (this.song.notes.length + 1)) % 600
      },
      height: 40,
      width: 100
    }
    this.song.notes.push(newNote);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading song...',
    });
    this.loading.present();
  }

  loadSong() {
    this.storage.get('song:' + this.songId).then(res => {
      if(res) {
        this.song = res;
        this.song.currentKey = res.key;
        this.loading.dismiss();
        if(!this.song.notes) {
          this.song.notes = [];
        }
      } else {
        this.backandService.getSongById(this.songId)
        .then( (response) => {
          this.song = response;
          this.song.currentKey = response.key;
          this.song.notes = [];
          this.storage.set('song:' + this.songId, response);
          this.loading.dismiss();
        });
      }
    });
  }

  loadSetlistSong(songBuffer: any) {
    this.storage.get('song:' + this.songId).then(res => {
      if(res) {
        this.song = res;
        this.savedKey = songBuffer.currentKey;
        this.song.currentKey = res.key;
        this.song.notes = songBuffer.notes;
        this.song.fontSize = songBuffer.fontSize;
        this.loading.dismiss();
      } else {
        this.backandService.getSongById(this.songId)
        .then( (response) => {
          this.song = response;
          this.savedKey = songBuffer.currentKey;
          this.song.currentKey = response.key;
          this.song.notes = songBuffer.notes;
          this.storage.set('song:' + this.songId, response);
          this.loading.dismiss();
        });
      }
    });
  }

  onNoteChange(event: any, index: number) {
    this.song.notes[index] = event;
  }

  onNoteRemove(index: number) {
    this.song.notes.splice(index, 1);
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
    if(this.listType === 'setlist') {
      let songBuffer = this.navParams.get('data');
      if(songBuffer.currentKey) {
        this.loadSetlistSong(songBuffer);
      } else {
        this.loadSong();
      }
    } else {
      this.loadSong();
    }
  }

  changeUpDownBtnStyle() {
    let btnElements = document.querySelectorAll('.up-down-container button');
    for(let i = 0 ; i < btnElements.length; ++i) {
      btnElements[i].classList.add('up-down-btn');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if(this.listType === 'setlist' && this.song) {
        this.song.currentKey = this.savedKey;
      }
    }, 500); // this will not work if the internet is too slow...
  }

  ionViewWillEnter() {

    // re-subscribe
    this.events.unsubscribe('song:keyChanged');
    this.events.unsubscribe('song:addToSetlist');
    this.events.unsubscribe('style:fontSizeChange');

    // set default font size
    let font = (this.listType === 'setlist' && this.song && this.song.fontSize) ? this.song.fontSize : this.AppConfig.getFontSize();
    this.fontSize = font;

    // keychange in popover
    this.events.subscribe('song:keyChanged', (newKey) => {
      this.song.currentKey = newKey;
    });

    // add to setlist in popover
    this.events.subscribe('song:addToSetlist', (data) => {
      console.log('add to setlist', data);
      this.song.fontSize = this.fontSize;
      // if(this.listType === 'setlist') {
        this.setlistService.addToSetlist(data.setlistIndex, this.song);
        this.showAlert('Successfully update your setlist');
        console.log('after add', this.song);
      // } else {
      //   this.setlistService.addSong(1, this.song); // TODO
      //   this.showAlert('Successfully add to your setlist');
      // }
    });

    // font size change
    this.events.subscribe('style:fontSizeChange', (delta) => {
      let tmpSize = this.fontSize + delta;
      if(tmpSize > 12 && tmpSize < 24) {
        this.fontSize = tmpSize;
      }
    });
  }

  ionViewDidEnter() {
    let scrollContent = document.querySelector('#song-detail-ion-content .scroll-content');
    this.offsetTop = scrollContent.getBoundingClientRect().top;

    this.changeUpDownBtnStyle();
  }


}

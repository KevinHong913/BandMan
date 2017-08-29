import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Backand } from '../../providers/backand';
import { Song } from '../../models/song';
import { SetlistService } from '../../providers/setlist';
import { ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html',
})
export class SongsPage {
  loading: Loading;
  songList: Song[];
  listType = 'songlist';
  currentSongIndex = -1; // start with -1
  filter: string;
  filteredList: Song[];
  isOffline: boolean = false;

  onConnect: any;
  onDisconnect: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private backandService: Backand, public setlistService: SetlistService,
              public events: Events, private storage: Storage,
              private alertCtrl: AlertController, private loadingCtrl: LoadingController,
              private network: Network) {
  }

  navToSongDetail(songId: number, listType: string, options: any = {}): void {
    let params = {
      songId: songId,
      listType: listType
    };
    this.navCtrl.push('SongDetailsPage', params, options );
  }

  listRefresh(refresher): void {
    this.getSongList(refresher);
  }

  goToSong(songId: number, index: number): void {
    if(this.isOffline) {
      this.showOfflineAlert();
    } else {
      this.currentSongIndex = index;
      this.navToSongDetail(songId, this.listType);
    }
  }

  // addToSetlist(song: Song, slidingItem: ItemSliding): void {
  //   this.setlistService.addSong(1, song); // TODO
  //   slidingItem.close();
  // }

  showOfflineAlert() {
    this.alertCtrl.create({
      title: 'Offline',
      subTitle: 'You are currently offline...',
      buttons: [{
        text: 'OK'
      }]
    }).present();
  }

  getSongList(refresher?: any): void {
    if(this.isOffline) {
      this.showOfflineAlert();
      this.loadListFromStorage();
    } else {
      this.showLoading();
      this.backandService.getSongList()
      .then(response => {
        this.songList = response;
        this.filteredList = response;
        this.storage.set('songList', this.songList);
        if(refresher) {
          refresher.complete();
        }
        this.loading.dismiss();
      }, err => {
        this.loading.dismiss();
        this.alertCtrl.create({
          title: 'Warning',
          subTitle: 'Cannot get song list',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.isOffline = true;
              this.loadListFromStorage();
              if(refresher) {
                refresher.cancel();
              }
            }
          }]
        }).present();
      })
    }
  }

  loadListFromStorage() {
    this.storage.get('songList').then(response => {
      this.songList = response;
      this.filteredList = response;
    })
  }

  searchSongs(event: any) {
    let filter = event.target.value;
    // if the value is an empty string don't filter the items
    if (filter && filter.trim() !== '') {
      filter = filter.toLowerCase();
      this.filteredList = this.songList.filter((song) => {
        return !filter || (song.title ? ('' + song.title).toLowerCase().indexOf(filter) !== -1 : false)
         || (song.artist ? ('' + song.artist).toLowerCase().indexOf(filter) !== -1 : false);;
      })
    } else {
      this.filteredList = this.songList;
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Refreshing list...',
    });
    this.loading.present();
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
    this.onConnect = this.network.onConnect().subscribe(data => {
      this.isOffline = false;
    }, error => console.error(error));

    this.onDisconnect = this.network.onDisconnect().subscribe(data => {
      this.isOffline = true;
    }, error => console.error(error));
  }

  ionViewWillLeave(){
    this.onConnect.unsubscribe();
    this.onDisconnect.unsubscribe();
  }

  ngOnInit() {
    this.getSongList();
    this.songChangeEvent();
  }

}

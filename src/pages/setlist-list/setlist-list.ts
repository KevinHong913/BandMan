import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, PopoverController, Loading, LoadingController } from 'ionic-angular';
import { Song } from '../../models/song';
import { SetlistService } from '../../providers/setlist';
import { ItemSliding } from 'ionic-angular';
import { Backand } from '../../providers/backand';

@IonicPage()
@Component({
  selector: 'page-setlist-list',
  templateUrl: 'setlist-list.html',
})
export class SetlistListPage {
  loading: Loading;
  setlists: any[];
  isAnonUser: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
              private setlistService: SetlistService, public events: Events, private backandService: Backand,
              public alertCtrl: AlertController, private popoverCtrl: PopoverController) {
  }


  gotToSetlist(setlist: any, index: number): void {
    this.navCtrl.push('SetlistPage', {setlistIndex: index});
  }

  removeSetList(index: number, slidingItem?: ItemSliding): void {
    let prompt = this.alertCtrl.create({
      title: 'Delete Confirm',
      subTitle: 'Are you sure you want to delete this setlist? You can still retrieve it by refreshing or fetch by Id (only if the setlist is uploaded)',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          // console.log('Cancel clicked');
        }
      }, {
        text: 'Delete',
        handler: data => {
          // console.log('Delete clicked', data);
          this.setlistService.deleteSetlist(index)
          .then(response => {
            this.setlists = response;
          });
        }
      }]
    }).present();
    if(slidingItem) {
      slidingItem.close();
    }
  }

  reorderSetlists(indexes) {
    this.setlistService.reorderSetlists(indexes);
  }

  presentNewsetlistPopover(event) {
    let popover = this.popoverCtrl.create('SetlistListPopover');
    popover.present({
      ev: event
    });
  }

  login() {
    this.events.publish('user:logout');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
    });
    this.loading.present();
  }

  setlistRefresh(refresher?) {
    let prompt = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'This action will fetch the setlist you own and overwrite the duplicated ones. Are you sure you want to continue?',
      buttons: [{
        text: 'No',
        handler: data => {
          // console.log('Cancel clicked');
          if(refresher) {
            refresher.complete();
          }

        }
      }, {
        text: 'Yes',
        handler: data => {
          // console.log('Yes clicked', data);
          this.setlistService.getSetlists(true)
          .then(response => {
            this.setlists = response;
            if(refresher) {
              refresher.complete();
            }
          })
          .catch(error => {
            if(refresher) {
              refresher.complete();
            }
          });
        }
      }]
    }).present();
  }

  getSetlistById(id: number) {
    this.showLoading();
    this.setlistService.getSetlistById(id, false)
    .then( response => {
      this.loading.dismiss();
      if(response.success) {
        this.setlistService.addSetlist(response.data);
      } else {
        // console.log(response);
        this.alertCtrl.create({
          title: 'Error',
          subTitle: response.message,
          buttons: ['OK']
        }).present();
      }
    }, error => {
      this.loading.dismiss();
    });
  }

  subCreateSetlist() {
    this.events.unsubscribe('setlist:create');
    this.events.subscribe('setlist:create', (data) => {
      this.setlists = this.setlistService.createSetlist(data.title);
    });
  }

  subFetchSetlist() {
    this.events.unsubscribe('setlist:fetch');
    this.events.subscribe('setlist:fetch', (data) => {
      this.getSetlistById(data.id);
    });
  }

  ionViewWillEnter() {
    this.setlistService.getSetlists()
    .then(response => {
      this.setlists = response;
    });
    // console.log('GET setlists', this.setlists);
  }

  ngOnInit() {
    this.subCreateSetlist();
    this.subFetchSetlist();

    this.backandService.isAnonUser()
    .then((data: any) => {
      this.isAnonUser = data;
    });
  }

}

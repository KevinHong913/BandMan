import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams, Loading, LoadingController, ViewController, AlertController, Events } from 'ionic-angular';
import { SetlistService } from '../../providers/setlist';

@IonicPage()
@Component({
  selector: 'setlist-setting-modal',
  templateUrl: 'setlist-setting-modal.html'
})
export class SetlistSettingModalComponent {

  loading: Loading;
  setlist: any;
  index: number;
  isInit: boolean = true;
  origPermission: string;
  isRadioDisabled: boolean;

  constructor(private platform: Platform, private navParams: NavParams, private viewCtrl: ViewController,
              private setlistService: SetlistService, private alertCtrl: AlertController,
              private events: Events, public loadingCtrl: LoadingController) {
    this.setlist = Object.assign({}, navParams.get('setlist'));
    this.isInit = navParams.get('isInit');
    this.index = navParams.get('index');
    this.isRadioDisabled = (!this.setlist.isOwner);
  }

  createLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
  }

  shareSetlist() {
    this.loading.present();
    if( +this.setlist.id <= 0 ) {
      this.setlistService.uploadSetlist(this.index, this.setlist)
      .then( response => {
        this.loading.dismiss();
        this.showAlert(response.title + ' has been uploaded with the ID ' + response.id);
      });
    } else {
      this.setlistService.updateSetlist(this.index, this.setlist)
      .then( response => {
        this.loading.dismiss();
        this.showAlert(response.title + ' has been updated.');
      })
    }
  }

  deleteSetlist() {
    this.alertCtrl.create({
      title: 'Delete',
      subTitle: 'Are you sure you want to delete setlist?',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          // console.log('Cancel delete');
        }
      }, {
        text: 'Yes',
        handler: data => {
          // console.log('Delete clicked', data);
          this.setlistService.deleteSetlist(this.index, {fromServer: true})
          .then(response => {
            this.events.publish('setlist:deleteFromServer');
          })
          this.dismiss();
        }
      }]
    }).present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showAlert(message: string) {
    this.alertCtrl.create({
      title: 'Success',
      subTitle: message,
      buttons: ['OK']
    }).present()
    .then(res => {
      this.dismiss();
    });
  }

  ngOnInit() {
    this.createLoading();
    this.origPermission = this.setlist.permission;
  }

}

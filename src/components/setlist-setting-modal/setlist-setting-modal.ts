import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SetlistService } from '../../providers/setlist';

@IonicPage()
@Component({
  selector: 'setlist-setting-modal',
  templateUrl: 'setlist-setting-modal.html'
})
export class SetlistSettingModalComponent {

  setlist: any;
  index: number;
  isInit: boolean = true;
  origPermission: string;
  isRadioDisabled: boolean;

  constructor(private platform: Platform, private navParams: NavParams, private viewCtrl: ViewController,
              private setlistService: SetlistService, private alertCtrl: AlertController) {
    this.setlist = navParams.get('setlist');
    this.isInit = navParams.get('isInit');
    this.index = navParams.get('index');
    this.isRadioDisabled = (!this.setlist.isOwner && this.setlist.permission === 'R');

    console.log('modal', this.setlist);
  }

  shareSetlist() {
    if( +this.setlist.id <= 0 ) {
      this.setlistService.uploadSetlist(this.index, this.setlist)
      .then( response => {
        this.showAlert(response.title + ' has been uploaded with the ID ' + response.id);
      });
    } else {
      this.setlistService.updateSetlist(this.index, this.setlist)
      .then( response => {
        this.showAlert(response.title + ' has been updated.');
      })
    }
  }

  deleteSetlist() {
    this.alertCtrl.create({
      title: 'Comfirm Delete',
      subTitle: 'Are you sure you want to delete setlist?',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel delete');
        }
      }, {
        text: 'Yes',
        handler: data => {
          console.log('Delete clicked', data);
          this.setlistService.deleteSetlist(this.index, {fromServer: true});
          this.viewCtrl.dismiss();
        }
      }]
    }).present()
    .then(res => {
      this.dismiss();
    });
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
    this.origPermission = this.setlist.permission;
  }

}

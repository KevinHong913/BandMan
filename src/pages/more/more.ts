import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  AlertController,
  ToastController
} from 'ionic-angular';
import { AppConfig } from '../../providers/config';
import { Backand } from '../../providers/backand';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  fontSize: number;
  isAnonUser: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events, public alertCtrl: AlertController,
              public appConfig: AppConfig, private toastCtrl: ToastController,
              private backandService: Backand) {
    this.fontSize = appConfig.getFontSize();

    this.backandService.isAnonUser()
    .then((data: any) => {
      this.isAnonUser = data;
    });
  }

  ionViewDidLoad() {
  }

  setFontSize(newSize: number): void {
    this.appConfig.setFontSize(Number(newSize));
  }

  onCleanCache(): void {
    this.alertCtrl.create({
      title: 'Clear Cache',
      message: 'Are you sure you want clear the cache?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.appConfig.clearSongCache();
            this.showToast('Cache Cleared');
          }
        }
      ]
    }).present();
  }

  login() {
    this.events.publish('user:logout');
  }

  logout(): void {
    this.alertCtrl.create({
      title: 'Logging out',
      message: 'Are you sure you want to log out of this account?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.events.publish('user:logout');
          }
        }
      ]
    }).present();
  }

  showToast(message: string): void {
    this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle',
      dismissOnPageChange: true,
      cssClass: 'confirmToast'
    }).present();
  }

}

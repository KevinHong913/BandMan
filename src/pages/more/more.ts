import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { AppConfig } from '../../providers/config';

/**
 * Generated class for the More page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  fontSize: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events, public alertCtrl: AlertController,
              public appConfig: AppConfig) {
    this.fontSize = appConfig.getFontSize();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad More');
  }

  setFontSize(newSize: number): void {
    this.appConfig.setFontSize(Number(newSize));
  }

  logout() {
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

}

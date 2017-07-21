import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  body: any;
  token: string = '';
  username = '';
  newPassword = '';
  confirmPassword = '';

  sendEmail: boolean; // true: reset, false: update
  success = '';
  error = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private backandService: BackandService, private alertCtrl: AlertController) {
  }

  reset() {
    this.error = null;
    this.success = null;
    this.backandService.requestResetPassword(this.username)
    .then( (res) => {
      this.alertCtrl.create({
        title: 'Password reset',
        subTitle: 'Please check your email to continue',
        buttons: ['OK']
      }).present()
      .then(() => {
        this.navCtrl.pop();
      });
    }, (error) => {
      this.alertCtrl.create({
        title: 'Fail',
        subTitle: error && error.data || 'Unknown error from server',
        buttons: ['OK']
      }).present();
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}

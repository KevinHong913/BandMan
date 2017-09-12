import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  username: string = '';
  password: string = '';
  auth_type:string = 'Token';
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';

  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private backand: BackandService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, public events: Events ) {
    this.backand.user.getUserDetails()
    .then((data: any) => {
      // console.log(data);
      if (data.data){
        this.loggedInUser = data.data.username;
        this.auth_status = 'OK';
        this.auth_type = data.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        this.navCtrl.setRoot(TabsPage);
      }
      else{
       this.auth_status = null;
      }
    },
    (err: any) => {
      // console.log(err);
      this.loggedInUser = null;
      this.auth_status = null;
      this.auth_type = null;
    });
  }

  forgotPassword(event) {
    this.navCtrl.push('ForgotPasswordPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  anonLogin() {
    this.useAnonymousAuth();
  }

  useAnonymousAuth() {
    this.backand.useAnonymousAuth()
    .then((data) => {
      this.auth_status = 'OK';
      this.is_auth_error = false;
      this.auth_type = 'Anonymous';
      this.loggedInUser = 'Anonymous';
      this.navCtrl.setRoot(TabsPage);
    });
  }

  login() {
    this.showLoading();

    this.backand.signin(this.username, this.password)
    .then((data: any) => {
      // console.log('signin', data);
      this.auth_status = 'OK';
      this.is_auth_error = false;
      this.loggedInUser = data.data.username;
      this.username = '';
      this.password = '';
      this.loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    },
    (error: any) => {
      // console.log(error);
      let errorMessage: string = error.data.error_description;
      this.auth_status = `Error: ${errorMessage}`;
      this.is_auth_error = true;
      // console.log(errorMessage)
      this.auth_status = 'ERROR';
      this.showError(errorMessage);
    }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Logging in...',
      // dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    }).present();
  }

  logout() {
    this.backand.signout()
    .then(response => {
      if(response.status === 200) {
        this.auth_status = null;
        this.navCtrl.setRoot('LoginPage');
      }
    });
  }

  ngOnInit() {
    this.events.subscribe('user:logout', () => {
      this.logout();
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, Platform, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'setlist-setting-modal',
  templateUrl: 'setlist-setting-modal.html'
})
export class SetlistSettingModalComponent {

  constructor(private platform: Platform, private navParams: NavParams, private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

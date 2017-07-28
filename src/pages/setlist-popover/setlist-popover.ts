import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

/**
 * Generated class for the SetlistPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setlist-popover',
  templateUrl: 'setlist-popover.html',
})
export class SetlistPopover {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetlistPopoverPage');
  }

  onClearAllEvent(event) {
    this.events.publish('setlist:clearall');
    this.viewCtrl.dismiss();
  }

}

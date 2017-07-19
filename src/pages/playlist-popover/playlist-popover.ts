import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

/**
 * Generated class for the PlaylistPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-playlist-popover',
  templateUrl: 'playlist-popover.html',
})
export class PlaylistPopover {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPopoverPage');
  }

  onClearAllEvent(event) {
    this.events.publish('playlist:clearall');
    this.viewCtrl.dismiss();
  }

}

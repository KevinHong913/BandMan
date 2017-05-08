import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Ng2ChordTransposeService } from 'ng2-chord-transpose';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the SongDetailsPopover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-song-details-popover',
  templateUrl: 'song-details-popover.html',
})
export class SongDetailsPopover {
  keysList: string[];
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ng2ChordTransposeService: Ng2ChordTransposeService, public events: Events) {
    this.keysList = ng2ChordTransposeService.getKeysList()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongDetailsPopover');
  }

  keyValueChange(key) {
    this.events.publish('song:keyChanged', this.key);
    console.log("[popover] key: ", this.key);
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.key = this.navParams.data.key;
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { Ng2ChordTransposeService } from 'ng2-chord-transpose';

@IonicPage()
@Component({
  selector: 'page-song-details-popover',
  templateUrl: 'song-details-popover.html',
})
export class SongDetailsPopover {
  keysList: string[];
  key: string;
  fontSizeChangeUnit = 2;

  addButtonText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ng2ChordTransposeService: Ng2ChordTransposeService, public events: Events,
              public viewCtrl: ViewController) {
    this.keysList = ng2ChordTransposeService.getKeysList();
  }

  keyValueChange(key) {
    this.events.publish('song:keyChanged', this.key);
    console.log("[popover] key: ", this.key);
  }

  addToPlaylist() {
    this.events.publish('song:addToPlaylist');
    this.viewCtrl.dismiss();
  }

  changeFontSize(direction: number) {
    this.events.publish('style:fontSizeChange', this.fontSizeChangeUnit * direction);
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.key = this.navParams.data.key;
      this.addButtonText = this.navParams.data.isPlaylist ? 'Save' : 'Add to playlist';
    }
  }

}

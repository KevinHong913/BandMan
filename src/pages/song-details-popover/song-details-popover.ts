import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, AlertController } from 'ionic-angular';
import { Ng2ChordTransposeService } from 'ng2-chord-transpose';
import { SetlistService } from '../../providers/setlist';

@IonicPage()
@Component({
  selector: 'page-song-details-popover',
  templateUrl: 'song-details-popover.html',
})
export class SongDetailsPopover {
  keysList: string[];
  setlistIndex: number;
  key: string;
  fontSizeChangeUnit = 2;
  isSetlist: boolean;

  addButtonText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ng2ChordTransposeService: Ng2ChordTransposeService, public events: Events,
              public viewCtrl: ViewController, private alertCtrl: AlertController,
              private setlistService: SetlistService) {
    this.keysList = ng2ChordTransposeService.getKeysList();
    this.isSetlist = navParams.get('isSetlist');
    this.setlistIndex = navParams.get('setlistIndex') | -1;
  }

  keyValueChange(key) {
    this.events.publish('song:keyChanged', this.key);
  }

  // what if the user does not have access to the setlist

  // Move to new modal service
  addToSetlist() {

    const nameList = this.setlistService.getSetlistsName();
    const options = nameList.map( (title, index) => {
      return {
        type: 'radio',
        label: title,
        value: index.toString(),
        checked: (index === this.setlistIndex)
      }
    });
    const alert = this.alertCtrl.create({
      title: 'Add to setlist',
      inputs: options,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // console.log('Add setlist cancelled');
          }
        },
        {
          text: 'Add',
          handler: (data) => {
            this.triggerAddEvent(data);
          }
        }
      ]
    });
    alert.present();
  }

  triggerAddEvent(index: number) {
    this.events.publish('song:addToSetlist', {setlistIndex: index});
    this.viewCtrl.dismiss();
  }

  changeFontSize(direction: number) {
    this.events.publish('style:fontSizeChange', this.fontSizeChangeUnit * direction);
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.key = this.navParams.data.key;
      this.addButtonText = this.isSetlist ? 'Save' : 'Add to setlist';
    }
  }

}

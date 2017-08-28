import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setlist-popover',
  templateUrl: 'setlist-popover.html',
})
export class SetlistPopover {

  setlist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetlistPopoverPage');
  }

  onClearAllEvent(event) {
    this.events.publish('setlist:clear');
    this.viewCtrl.dismiss();
  }

  onShareEvent(event) {
    this.events.publish('setlist:share');
  }

  onOpenSettingEvent(event) {
    this.events.publish('setlist:setting');
  }

  onDeleteEvent(event) {
    this.events.publish('setlist:delete');
  }


  ngOnInit() {
    if(this.navParams.data) {
      this.setlist = this.navParams.data.setlist;
    }
  }
}

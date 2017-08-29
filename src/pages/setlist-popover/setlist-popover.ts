import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setlist-popover',
  templateUrl: 'setlist-popover.html',
})
export class SetlistPopover {

  setlist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, private viewCtrl: ViewController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetlistPopoverPage');
  }

  onClearAllEvent(event) {
    this.alertCtrl.create({
      title: 'Clear',
      subTitle: 'Are you sure you want to clear the setlist?',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clear');
        }
      }, {
        text: 'Yes',
        handler: data => {
          console.log('Clear clicked', data);
          this.viewCtrl.dismiss();
          this.events.publish('setlist:clear');
        }
      }]
    }).present();
  }

  onShareEvent(event) {
    this.viewCtrl.dismiss();
    this.events.publish('setlist:share');
  }

  onOpenSettingEvent(event) {
    this.viewCtrl.dismiss();
    this.events.publish('setlist:setting');
  }

  onDeleteEvent(event) {
    this.alertCtrl.create({
      title: 'Delete',
      subTitle: 'Are you sure you want to delete setlist?',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel delete');
        }
      }, {
        text: 'Yes',
        handler: data => {
          console.log('Delete clicked', data);
          this.viewCtrl.dismiss();
          this.events.publish('setlist:delete');
        }
      }]
    }).present();
  }


  ngOnInit() {
    if(this.navParams.data) {
      this.setlist = this.navParams.data.setlist;
    }
  }
}

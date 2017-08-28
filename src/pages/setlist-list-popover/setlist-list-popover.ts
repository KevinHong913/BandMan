import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setlist-list-popover',
  templateUrl: 'setlist-list-popover.html',
})
export class SetlistListPopover {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, private viewCtrl: ViewController, private alertCtrl: AlertController) {
  }
  presentCreateSetlistPrompt(event) {
    let prompt = this.alertCtrl.create({
      title: 'New Setlist',
      inputs: [
        {
          name: 'title',
          placeholder: 'Setlist Title'
        },
      ],
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked', data);
          this.events.publish('setlist:create', {title: data.title});
          this.viewCtrl.dismiss();
        }
      }]
    });
    prompt.present();
  }

  presentFetchSetlistPrompt(event) {
    let prompt = this.alertCtrl.create({
      title: 'Fetch from server by ID',
      inputs: [
        {
          name: 'setlistId',
          placeholder: 'Enter Setlist ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Go',
          handler: data => {
            this.events.publish('setlist:fetch', {id: data.setlistId});
            this.viewCtrl.dismiss();
          }
        }
      ]
    });
    prompt.present();
  }
}

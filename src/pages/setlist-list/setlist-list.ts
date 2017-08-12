import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Song } from '../../models/song';
import { SetlistService } from '../../providers/setlist';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-setlist-list',
  templateUrl: 'setlist-list.html',
})
export class SetlistListPage {
  setlists: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private setlistService: SetlistService, public events: Events,
              public alertCtrl: AlertController) {
  }


  gotToSetlist(setlist: any, index: number): void {
    this.navCtrl.push('SetlistPage', {setlistIndex: index});
  }

  removeSetList(index: number, slidingItem: ItemSliding): void {
    this.setlists = this.setlistService.deleteSetlist(index);
    slidingItem.close();
  }

  reorderSetList(indexes) {
    this.setlistService.reorderSetlists(indexes);
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
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            this.setlists = this.setlistService.createSetlist(data.title);
          }
        }
      ]
    });
    prompt.present();
  }


  ionViewWillEnter() {
    this.setlists = this.setlistService.getSetlists();
    console.log('GET setlists', this.setlists);
  }

  ngOnInit() {
  }

}

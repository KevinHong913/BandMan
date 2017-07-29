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
    this.navCtrl.push('SetlistPage');
  }

  removeSetList(index: number, slidingItem: ItemSliding): void {
    this.setlists = this.setlistService.deleteSetlist(index);
    slidingItem.close();
  }

  reorderSetList(indexes) {
    this.setlistService.reorderSetlists(indexes);
  }


  ionViewWillEnter() {
    this.setlists = this.setlistService.getSetlists();
    console.log('GET setlists', this.setlists);
  }

  ngOnInit() {
  }

}

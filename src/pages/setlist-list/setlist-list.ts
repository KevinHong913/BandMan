import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, PopoverController } from 'ionic-angular';
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
              public alertCtrl: AlertController, private popoverCtrl: PopoverController) {
  }


  gotToSetlist(setlist: any, index: number): void {
    this.navCtrl.push('SetlistPage', {setlistIndex: index});
  }

  removeSetList(index: number, slidingItem: ItemSliding): void {
    let prompt = this.alertCtrl.create({
      title: 'Delete Confirm',
      subTitle: 'Are you sure you want to delete this setlist?',
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Delete',
        handler: data => {
          console.log('Delete clicked', data);
          this.setlists = this.setlistService.deleteSetlist(index);
        }
      }]
    }).present();
    slidingItem.close();
  }

  reorderSetList(indexes) {
    this.setlistService.reorderSetlists(indexes);
  }

  presentNewsetlistPopover(event) {
    let popover = this.popoverCtrl.create('SetlistListPopover');
    popover.present({
      ev: event
    });
  }

  setlistRefresh(refresher?) {
    this.setlistService.getSetlists(true)
    .then(response => {
      this.setlists = response;
      if(refresher) {
        refresher.complete();
      }
    })
    .catch(error => {
      if(refresher) {
        refresher.complete();
      }
    });

  }

  getSetlistById(id: number) {
    this.setlistService.getSetlistById(id)
    .then( response => {
      if(response.success) {
        this.setlistService.addSetlist(response.data);
      } else {
        this.alertCtrl.create({
          title: 'Error',
          subTitle: response.message,
          buttons: ['OK']
        }).present();
      }
    });
  }

  subCreateSetlist() {
    this.events.unsubscribe('setlist:create');
    this.events.subscribe('setlist:create', (data) => {
      this.setlists = this.setlistService.createSetlist(data.title);
    });
  }

  subFetchSetlist() {
    this.events.unsubscribe('setlist:fetch');
    this.events.subscribe('setlist:fetch', (data) => {
      this.getSetlistById(data.id);
    });
  }

  ionViewWillEnter() {
    this.setlistService.getSetlists()
    .then(response => {
      this.setlists = response; 
    });
    console.log('GET setlists', this.setlists);
  }

  ngOnInit() {
    this.subCreateSetlist();
    this.subFetchSetlist();
  }

}

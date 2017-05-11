import { Component } from '@angular/core';
import { SongsPage } from '../songs/songs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'SongsPage';
  tab2Root = 'PlaylistPage';
  // tab3Root = ContactPage;

  constructor() {

  }
}

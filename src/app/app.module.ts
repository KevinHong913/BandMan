import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Ng2ChordTransposeModule } from 'ng2-chord-transpose';

import { SongsPage } from '../pages/songs/songs';
import { TabsPage } from '../pages/tabs/tabs';
import { SongDetailsPage } from '../pages/song-details/song-details';
import { SongDetailsPopover } from '../pages/song-details-popover/song-details-popover';

import { Backand } from '../providers/backand';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'cd3298b7'
  }
};


@NgModule({
  declarations: [
    MyApp,
    SongsPage,
    TabsPage,
    SongDetailsPage,
    SongDetailsPopover
  ],
  imports: [
    HttpModule,
    BrowserModule,
    Ng2ChordTransposeModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SongsPage,
    SongDetailsPage,
    TabsPage,
    SongDetailsPopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Backand,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

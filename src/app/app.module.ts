import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Backand } from '../providers/backand';
import { BackandService } from '@backand/angular2-sdk';
import { PlaylistService } from '../providers/playlist';
import { Ng2ChordTransposeModule } from 'ng2-chord-transpose';
import { AppConfig } from '../providers/config';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/* PIPE NOT WORKING... :( */
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { SongFilterPipe } from '../pipes/song-filter-pipe';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'cd3298b7'
  }
};


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SongFilterPipe,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    Ng2ChordTransposeModule,
    Ng2FilterPipeModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Backand,
    BackandService,
    PlaylistService,
    SongFilterPipe,
    AppConfig,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Backand } from '../providers/backand';
import { BackandService } from '@backand/angular2-sdk';
import { SetlistService } from '../providers/setlist';
import { Ng2ChordTransposeModule } from 'ng2-chord-transpose';
import { AppConfig } from '../providers/config';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { StickyNoteComponent } from '../components/sticky-note/sticky-note';
// import { AbsoluteDragDirective } from '../directives/absolute-drag/absolute-drag';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'cd3298b7'
  }
};


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    // StickyNoteComponent,
    // AbsoluteDragDirective,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    Ng2ChordTransposeModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      swipeBackEnabled:false
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
    SetlistService,
    AppConfig,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

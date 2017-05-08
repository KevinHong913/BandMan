import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Ng2ChordTransposeModule } from 'ng2-chord-transpose';

import { TabsPage } from '../pages/tabs/tabs';

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
    TabsPage
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
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Backand,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

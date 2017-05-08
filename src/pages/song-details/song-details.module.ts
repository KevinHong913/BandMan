import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongDetailsPage } from './song-details';

@NgModule({
  declarations: [
    SongDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SongDetailsPage),
  ],
  exports: [
    SongDetailsPage
  ]
})
export class SongDetailsPageModule {}

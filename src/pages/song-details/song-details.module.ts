import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng2ChordTransposeModule } from 'ng2-chord-transpose';
import { SongDetailsPage } from './song-details';



@NgModule({
  declarations: [
    SongDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SongDetailsPage),
    Ng2ChordTransposeModule,
  ],
  exports: [
    SongDetailsPage
  ]
})
export class SongDetailsPageModule {}

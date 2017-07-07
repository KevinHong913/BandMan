import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng2ChordTransposeModule } from 'ng2-chord-transpose';
import { SongDetailsPage } from './song-details';
import { StickyNoteComponentModule } from '../../components/sticky-note/sticky-note.module';

@NgModule({
  declarations: [
    SongDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SongDetailsPage),
    Ng2ChordTransposeModule,
    StickyNoteComponentModule
  ],
  exports: [
    SongDetailsPage
  ]
})
export class SongDetailsPageModule {}

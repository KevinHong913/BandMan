import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StickyNoteComponent } from './sticky-note';

@NgModule({
  declarations: [
    StickyNoteComponent,
  ],
  imports: [
    IonicPageModule.forChild(StickyNoteComponent),
  ],
  exports: [
    StickyNoteComponent
  ]
})
export class StickyNoteComponentModule {}

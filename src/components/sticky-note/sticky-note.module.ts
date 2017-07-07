import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StickyNoteComponent } from './sticky-note';
import { AbsoluteDragDirectiveModule } from '../../directives/absolute-drag/absolute-drag.module';


@NgModule({
  declarations: [
    StickyNoteComponent
  ],
  imports: [
    IonicPageModule.forChild(StickyNoteComponent),
    AbsoluteDragDirectiveModule
  ],
  exports: [
    StickyNoteComponent
  ]
})
export class StickyNoteComponentModule {}

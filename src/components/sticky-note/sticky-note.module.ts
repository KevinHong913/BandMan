import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StickyNoteComponent } from './sticky-note';
import { AbsoluteDragDirectiveModule } from '../../directives/absolute-drag/absolute-drag.module';
import { ResizableModule } from 'angular-resizable-element';
import { Autosize } from 'ionic2-autosize';

@NgModule({
  declarations: [
    StickyNoteComponent
  ],
  imports: [
    IonicPageModule.forChild(StickyNoteComponent),
    AbsoluteDragDirectiveModule,
    ResizableModule
  ],
  exports: [
    StickyNoteComponent
  ]
})
export class StickyNoteComponentModule {}

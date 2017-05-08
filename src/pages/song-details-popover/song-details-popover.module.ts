import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SongDetailsPopover } from './song-details-popover';

@NgModule({
  declarations: [
    SongDetailsPopover,
  ],
  imports: [
    IonicPageModule.forChild(SongDetailsPopover),
  ],
  exports: [
    SongDetailsPopover
  ]
})
export class SongDetailsPopoverModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaylistPopover } from './playlist-popover';

@NgModule({
  declarations: [
    PlaylistPopover,
  ],
  imports: [
    IonicPageModule.forChild(PlaylistPopover),
  ],
  exports: [
    PlaylistPopover
  ]
})
export class PlaylistPopoverModule {}

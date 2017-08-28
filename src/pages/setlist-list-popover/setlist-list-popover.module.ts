import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetlistListPopover } from './setlist-list-popover';

@NgModule({
  declarations: [
    SetlistListPopover,
  ],
  imports: [
    IonicPageModule.forChild(SetlistListPopover),
  ],
  exports: [
    SetlistListPopover
  ]
})
export class SetlistListPopoverModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetlistPopover } from './setlist-popover';

@NgModule({
  declarations: [
    SetlistPopover,
  ],
  imports: [
    IonicPageModule.forChild(SetlistPopover),
  ],
  exports: [
    SetlistPopover
  ]
})
export class SetlistPopoverModule {}

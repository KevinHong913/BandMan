import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetlistSettingModalComponent } from './setlist-setting-modal';

@NgModule({
  declarations: [
    SetlistSettingModalComponent,
  ],
  imports: [
    IonicPageModule.forChild(SetlistSettingModalComponent),
  ],
  exports: [
    SetlistSettingModalComponent
  ]
})
export class SetlistSettingModalComponentModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetlistListPage } from './setlist-list';

@NgModule({
  declarations: [
    SetlistListPage,
  ],
  imports: [
    IonicPageModule.forChild(SetlistListPage),
  ],
  exports: [
    SetlistListPage
  ]
})
export class SetlistListPageModule {}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppConfig {

  private fontSize: number;
  private fontSizeSubject: Subject<any> = new Subject<any>();

  constructor(public storage: Storage) {

    // set font size
    this.storage.get('fontSize').then((response) => {
      if(response) {
        this.fontSize = response;
      } else {
        this.fontSize = 18;
        storage.set('fontSize', this.fontSize);
      }
    });
  }

  getFontSize() {
    return this.fontSize;
  }
  subscribeFontSize(): Observable<any> {
    return this.fontSizeSubject.asObservable();
  }

  adjustFontSize(delta: number): void {
    let tmpSize = this.fontSize + delta;
    if(tmpSize > 12 && tmpSize < 24) {
      this.fontSize = tmpSize;
      console.log(this.fontSize);
      this.fontSizeSubject.next(this.fontSize);
      this.storage.set('fontSize', this.fontSize);
    }
  }

}

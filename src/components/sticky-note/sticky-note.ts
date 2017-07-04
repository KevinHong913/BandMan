import { Component } from '@angular/core';

@Component({
  selector: 'sticky-note',
  templateUrl: 'sticky-note.html'
})
export class StickyNoteComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}

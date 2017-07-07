import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note';
import { Position } from '../../models/position';
import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';

@Component({
  selector: 'sticky-note',
  templateUrl: 'sticky-note.html'
})
export class StickyNoteComponent {

  @Input() note: Note;
  // @Output() noteChange = new EventEmitter<any>();

  private noteTop: number;
  private noteLeft: number;

  constructor() {

  }

  ngAfterViewInit() {
    // let hammer = new window['Hammer'](this.element.nativeElement);
    // hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

  }

  ngOnInit() {
    this.noteTop = this.note.position.top;
    this.noteLeft = this.note.position.left;
  }

  panEvent(event) {
    console.log('pan', event);
    this.noteTop = event.center.y;
    this.noteLeft = event.center.x;
  }
}

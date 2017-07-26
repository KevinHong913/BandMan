import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Note } from '../../models/note';
import { Position } from '../../models/position';
import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';
import { ResizeEvent } from 'angular-resizable-element';
import { Autosize } from 'ionic2-autosize';

@Component({
  selector: 'sticky-note',
  templateUrl: 'sticky-note.html'
})
export class StickyNoteComponent {

  @Input() note: Note;
  @Input() offsetTop: number;
  @Output() noteChange = new EventEmitter<Note>();
  @Output() noteRemove = new EventEmitter<Note>();
  @ViewChild('editTextarea') editTextarea;

  content: any;
  isEdit = false;
  isResize = false;
  isDisabled = true;
  editWrapperStyle: any = {};

  constructor() {
    this.content = document.getElementById('song-detail-ion-content');
  }

  ngOnInit() {
  }

  onPanEvent(event) {
    if(!this.isEdit) {
      this.content.classList.add('pan'); // the pan class will set content to overflow hidden

      if(!this.isResize) {
        console.log('pan', event);
        this.note.position.top = event.center.y - this.offsetTop;
        this.note.position.left = event.center.x;
      }

      if(event.isFinal) {
        this.content.classList.remove('pan');
        this.triggerNoteChange();
      }
    }
  }

  onResizeStart(event: ResizeEvent): void {
    console.log('resize start');
    this.isResize = true;
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('resize end');
    setTimeout(() => {
      this.note.position.top = event.rectangle.top - this.offsetTop;
      this.note.position.left = event.rectangle.left;
    }, 50);

    this.note.width = event.rectangle.width;
    this.note.height = event.rectangle.height;

    this.isResize = false;
    this.triggerNoteChange();
  }

  onDataChange(event) {
    this.triggerNoteChange();
  }

  triggerNoteChange() {
    this.noteChange.emit(this.note);
  }

  onClickEvent(event) {
    this.isEdit = true;
  }

  onEditNote(event) {
    this.isDisabled = false;
    // const element = this.renderer.selectRootElement(this.editTextarea);
    setTimeout(() => {this.editTextarea.setFocus()}, 50);
  }

  onRemoveNote(event) {
    this.noteRemove.emit();
  }

  onEditDone(event) {
    this.isEdit = false;
    this.isDisabled = true;
  }
}

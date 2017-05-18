/***** NOT WORKING *****/
import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../models/song';

@Pipe({
  name: 'songFilter'
})
export class SongFilterPipe implements PipeTransform {


  transform(array: Song[], filter: string): Song[] {
    return array.filter(song => {
      if (filter) {
        filter = filter.toLowerCase();
      }
        return !filter || (song.title ? ('' + song.title).toLowerCase().indexOf(filter) !== -1 : false);
    });
  }
}

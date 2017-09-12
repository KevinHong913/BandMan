import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackandService } from '@backand/angular2-sdk';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';

import { Song } from '../models/song';

@Injectable()
export class Backand {
  // auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: '7df1cf16-b2a3-4c99-bad5-43a62485f28a'};
  // api_url: string = 'https://api.backand.com';
  // app_name: string = 'bandman';

  constructor(public http: Http, private backandService: BackandService) {}

  // private authHeader() {
  //   var authHeader = new Headers();
  //   authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
  //   return authHeader;
  // }

  isAnonUser(): Promise<any> {
    return this.backandService.user.getUsername()
    .then(res => {
      return (res.data === 'Guest');
    })
  }

  getSongList(): Promise<Song[]> {
    return this.backandService.query.post('GetSongName', {})
    .then(res => {
      return <Song[]>res.data;
    });
  }

  getSongById(id: number): Promise<Song> {
    return this.backandService.object.action.get('songs', 'GetSongById', {songId: id})
    .then( res => {
      return <Song>res.data;
    });
  }

  getAnnouncementList(): Promise<any> {
    return this.backandService.object.getList('accouncement');
  }
}

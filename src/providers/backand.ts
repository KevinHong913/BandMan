import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Song } from '../models/song';

@Injectable()
export class Backand {
  auth_token: {header_name: string, header_value: string} = {header_name: 'AnonymousToken', header_value: '7df1cf16-b2a3-4c99-bad5-43a62485f28a'};
  api_url: string = 'https://api.backand.com';
  app_name: string = 'frccworship';

  constructor(public http: Http) {}

  private authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
    return authHeader;
  }

  getSongList(): Observable<Song[]> {
    return this.http.get(this.api_url + '/1/query/data/GetSongName', {
      headers: this.authHeader()
    })
    .map( res => <Song[]>res.json() );
  }


  getAll(isDeep: boolean): Observable<Song[]> {
    return this.http.get(this.api_url + '/1/objects/songs', {
      headers: this.authHeader(),
      params: {
        deep: isDeep
      }
    })
    .map( res => <Song[]>res.json().data );
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get(this.api_url + '/1/objects/songs/' + id, {
      headers: this.authHeader(),
      params: {
        deep: true
      }
    })
    .map( res => <Song>res.json());
  }

  // public getTodos() {
  //   return this.http.get(this.api_url + '/1/objects/todos?returnObject=true', {
  //     headers: this.authHeader()
  //   })
  //   .map(res => res.json())
  // }

}

/*
  // https://api.backand.com:443/1/objects/songs?pageSize=20&pageNumber=1&deep=false
  service.getAll = function (deep) {
    var url = this.baseUrl;

    return $http({
      method: 'GET',
      url: Backand.getApiUrl() + baseUrl + '/songs',
      params: {
        deep: deep
      }
    });
  };

  // GET song by song Id
  service.getSongById = function(id) {
    // http request
    return $http({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/objects/songs/' + id,
      params: {
        deep: true
      }
    });
  };


  // POST new song
  service.addSong = function(data) {
    return $http ({
      method: 'POST',
      url: Backand.getApiUrl() + '/1/objects/songs',
      data: data,
      params: {
        deep: true,
      }
    });
  };

  service.getSections = function() {
    return $http ({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/objects/sections',
      params: {
        pageSize: 20,
        pageNumber: 1,
        filter: null,
        sort: ''
      }
    });
  };
*/

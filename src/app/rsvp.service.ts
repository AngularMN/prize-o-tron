import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Attendee } from './attendee';

@Injectable()
export class RsvpService {

  getAttendees(apiKey: string, eventId: string): Observable<Attendee[]> {
    return this.http.get(`/api/rsvps?key=${apiKey}&event_id=${eventId}`)
      .map((data) => {
        let body = data.json();
        return body.results.map((result) => {
          console.log(result)
          return {
            name: result.member.name,
            photo: result.member_photo ? result.member_photo.photo_link : "" //Some users don't have photos
          };
        });
      }
      )
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) { }


}

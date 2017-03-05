import {
  Component,
  OnInit
} from '@angular/core';

import { RsvpService } from '../rsvp.service';

@Component({
  selector: 'app-meetupevent',
  templateUrl: './meetupevent.component.html',
  styleUrls: ['./meetupevent.component.css']
})
export class MeetupeventComponent implements OnInit {

  events: Object[]

  constructor(private rsvpService: RsvpService) {
    this.events = [{
      event_id: null
    }]
  }

  ngOnInit() {}

  addEvent() {
    this.events.push({
      event_id: null
    })
  }
  importNames(apiKey, eventId) {
    alert(apiKey + ", " + eventId)
  }


}

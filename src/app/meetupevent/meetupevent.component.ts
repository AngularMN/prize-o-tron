import {
  Component,
  OnInit
} from '@angular/core';

import {
  RsvpService
} from '../rsvp.service';

@Component({
  selector: 'app-meetupevent',
  templateUrl: './meetupevent.component.html',
  styleUrls: ['./meetupevent.component.scss'],
  providers: [RsvpService]
})
export class MeetupeventComponent implements OnInit {

  constructor(private rsvpService: RsvpService) { }

  ngOnInit() { }

  importNames(apiKey, eventId) {
    this.rsvpService.getAttendees(apiKey, eventId)
      .subscribe((res) => console.log(res));
  }
}

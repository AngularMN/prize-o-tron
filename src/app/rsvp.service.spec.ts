import { TestBed, inject } from '@angular/core/testing';

import { RsvpService } from './rsvp.service';

import { MaterialModule } from '@angular/material'; // add this line

describe('RsvpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MaterialModule.forRoot()], // and this line
      providers: [RsvpService]
    });
  });

  it('should ...', inject([RsvpService], (service: RsvpService) => {
    expect(service).toBeTruthy();
  }));
});

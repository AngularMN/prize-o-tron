import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupeventComponent } from './meetupevent.component';

describe('MeetupeventComponent', () => {
  let component: MeetupeventComponent;
  let fixture: ComponentFixture<MeetupeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

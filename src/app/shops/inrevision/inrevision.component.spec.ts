import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InrevisionComponent } from './inrevision.component';

describe('AllComponent', () => {
  let component: InrevisionComponent;
  let fixture: ComponentFixture<InrevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InrevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InrevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

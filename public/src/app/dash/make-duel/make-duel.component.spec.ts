import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDuelComponent } from './make-duel.component';

describe('MakeDuelComponent', () => {
  let component: MakeDuelComponent;
  let fixture: ComponentFixture<MakeDuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

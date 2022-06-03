import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaqueComponent } from './view-saque.component';

describe('ViewSaqueComponent', () => {
  let component: ViewSaqueComponent;
  let fixture: ComponentFixture<ViewSaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

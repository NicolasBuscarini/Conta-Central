import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSaquesComponent } from './list-saques.component';

describe('ListSaquesComponent', () => {
  let component: ListSaquesComponent;
  let fixture: ComponentFixture<ListSaquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSaquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

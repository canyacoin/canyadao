import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomemodalComponent } from './homemodal.component';

describe('HomemodalComponent', () => {
  let component: HomemodalComponent;
  let fixture: ComponentFixture<HomemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

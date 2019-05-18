import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawmodalComponent } from './withdrawmodal.component';

describe('WithdrawmodalComponent', () => {
  let component: WithdrawmodalComponent;
  let fixture: ComponentFixture<WithdrawmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletswitchComponent } from './walletswitch.component';

describe('WalletswitchComponent', () => {
  let component: WalletswitchComponent;
  let fixture: ComponentFixture<WalletswitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletswitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletswitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

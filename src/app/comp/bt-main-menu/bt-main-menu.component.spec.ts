import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtMainMenuComponent } from './bt-main-menu.component';

describe('BtMainMenuComponent', () => {
  let component: BtMainMenuComponent;
  let fixture: ComponentFixture<BtMainMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtMainMenuComponent]
    });
    fixture = TestBed.createComponent(BtMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

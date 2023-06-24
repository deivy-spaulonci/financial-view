import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContaComponent } from './tipo-conta.component';

describe('TipoContaComponent', () => {
  let component: TipoContaComponent;
  let fixture: ComponentFixture<TipoContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoContaComponent]
    });
    fixture = TestBed.createComponent(TipoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcfornecedorComponent } from './acfornecedor.component';

describe('AcfornecedorComponent', () => {
  let component: AcfornecedorComponent;
  let fixture: ComponentFixture<AcfornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcfornecedorComponent]
    });
    fixture = TestBed.createComponent(AcfornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

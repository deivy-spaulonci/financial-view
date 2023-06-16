import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorFormComponent } from './fornecedor-form.component';

describe('FornecedorFormComponent', () => {
  let component: FornecedorFormComponent;
  let fixture: ComponentFixture<FornecedorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorFormComponent]
    });
    fixture = TestBed.createComponent(FornecedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
